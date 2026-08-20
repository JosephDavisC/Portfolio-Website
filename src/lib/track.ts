// Umami custom event helper. No-op when the tracker is blocked or absent.
type Umami = { track: (name: string, data?: Record<string, string>) => void };

export function track(name: string, data?: Record<string, string>) {
  const umami = (window as unknown as { umami?: Umami }).umami;
  try {
    umami?.track(name, data);
  } catch {
    // never let analytics break the UI
  }
}

// Fires "outbound-link" for any click on a link leaving the current domain.
// One global listener; internal navigation stays covered by pageviews.
export function initOutboundTracking() {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "click",
    (e) => {
      const el = e.target as Element | null;
      const a = el?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      try {
        const url = new URL(a.href, location.href);
        // own-domain links keep their referrer: strip noreferrer at click
        // time so cross-subdomain visits attribute in analytics (noopener,
        // the security half, stays). External links keep full noreferrer.
        if (
          /(^|\.)joechamdani\.(com|cloud)$/.test(url.host) &&
          a.relList?.contains("noreferrer")
        ) {
          a.relList.remove("noreferrer");
        }
        if (
          url.host !== location.host &&
          (url.protocol === "http:" || url.protocol === "https:")
        ) {
          track("outbound-link", { url: url.host + url.pathname });
        }
      } catch {
        // ignore unparsable hrefs
      }
    },
    { capture: true }
  );
}

// Manual pageview tracking with dedupe. Umami's auto-track double-fires on
// Chrome iOS (its navigation layer emits extra history events; verified as
// same-session rows ~10ms apart). The snippet sets data-auto-track="false"
// and this sender fires instead: any same-URL send within 800ms is dropped.
export function initPageTracking() {
  if (typeof window === "undefined") return;
  let lastUrl = "";
  let lastAt = 0;
  const send = () => {
    const url = location.pathname + location.search;
    const now = Date.now();
    if (url === lastUrl && now - lastAt < 800) return;
    // with auto-track off, Umami's internal URL never updates, so the
    // payload must carry url/title/referrer explicitly
    const referrer = lastUrl ? location.origin + lastUrl : document.referrer;
    lastUrl = url;
    lastAt = now;
    // function form: receives Umami's full default payload (website id,
    // hostname, screen...) and merges our overrides. A plain object arg
    // would REPLACE the payload and get rejected for the missing website id.
    const umami = (window as unknown as {
      umami?: {
        track: (
          fn: (props: Record<string, string>) => Record<string, string>
        ) => void;
      };
    }).umami;
    try {
      umami?.track((props) => ({ ...props, url, title: document.title, referrer }));
    } catch {
      // never let analytics break the UI
    }
  };
  // small delay so document.title has updated before the payload is built
  const schedule = () => setTimeout(send, 300);
  for (const m of ["pushState", "replaceState"] as const) {
    const orig = history[m].bind(history);
    (history[m] as unknown) = (...args: unknown[]) => {
      const r = (orig as (...a: unknown[]) => unknown)(...args);
      schedule();
      return r;
    };
  }
  window.addEventListener("popstate", schedule);
  // initial view: the umami script is deferred, poll briefly until it exists
  let tries = 0;
  const initial = () => {
    if ((window as unknown as { umami?: unknown }).umami) send();
    else if (tries++ < 50) setTimeout(initial, 100);
  };
  initial();
}
