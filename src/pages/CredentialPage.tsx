import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, PlayCircle } from "lucide-react";
import creds from "@/data/credentials.json";

/* ---------- Types ---------- */
type VideoInfo = {
  title?: string;
  url: string;
  poster?: string; // optional thumbnail for <video>
};
type Cred = {
  slug: string;
  title: string;
  issuer: string;
  issued?: string;
  file: string;            // pdf or image path under /public
  fallbackImage?: string;  // image fallback for mobile/tablet when file is pdf
  video?: VideoInfo;
  highlights?: string[];
};

/* ---------- Treat as "desktop" only when wide + mouse/trackpad present ---------- */
function useIsDesktop() {
  const [isDesktop, set] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1025px) and (hover: hover) and (pointer: fine)"
    );
    const sync = () => set(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);
  return isDesktop;
}

/* ---------- Video helpers ---------- */
const isYouTube = (url?: string) =>
  !!url && (url.includes("youtube.com") || url.includes("youtu.be"));

function toYouTubeEmbed(url: string) {
  try {
    const u = new URL(url);
    const id = u.hostname.includes("youtu.be")
      ? u.pathname.slice(1)
      : u.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}?rel=0` : null;
  } catch {
    return null;
  }
}
const isDrivePreview = (url?: string) =>
  !!url && url.includes("drive.google.com") && url.includes("/preview");
const isVideoFile = (url?: string) =>
  !!url && /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

/* ---------- Page ---------- */
export default function CredentialPage() {
  const { slug } = useParams();
  const cred = (creds as Cred[]).find((c) => c.slug === slug);
  const isDesktop = useIsDesktop();

  if (!cred) {
    return (
      <section className="min-h-screen py-24 px-6 bg-paper">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            state={{ scrollTo: "certifications" }}
            className="inline-flex items-center gap-2 text-espresso/60 hover:text-espresso font-mono"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h1 className="text-3xl font-heading font-semibold mt-6 text-espresso">Credential not found</h1>
        </div>
      </section>
    );
  }

  const isPdf = useMemo(
    () => cred.file.toLowerCase().endsWith(".pdf"),
    [cred.file]
  );

  // Choose best video embed
  const video = cred.video;
  const ytEmbed = video && isYouTube(video.url) ? toYouTubeEmbed(video.url) : null;
  const driveEmbed = video && isDrivePreview(video.url) ? video.url : null;
  const isFileVideo = video && isVideoFile(video.url);

  return (
    <section className="min-h-screen py-24 px-6 bg-paper">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-3 text-espresso">
            {cred.title}
          </h1>
        </div>
        <p className="text-espresso/60 text-center mb-2 font-mono">
          {cred.issuer}
          {cred.issued ? ` · Issued ${cred.issued}` : ""}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/"
            state={{ scrollTo: "certifications" }}
            className="inline-flex items-center gap-2 text-espresso/70 hover:text-espresso font-mono"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          <div className="flex items-center gap-3">
            {/* Phone/tablet: offer "Open PDF" in a new tab */}
            {!isDesktop && isPdf && (
              <a
                href={cred.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-espresso/70 hover:text-espresso font-mono"
              >
                <ExternalLink className="h-4 w-4" />
                Open PDF
              </a>
            )}
            <a
              href={cred.file}
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-court dark:bg-gradient-to-r dark:from-blue-500 dark:to-red-500 text-paper font-semibold rounded-lg border-2 border-espresso dark:border-transparent shadow-brutal-sm dark:shadow-none hover:shadow-brutal dark:hover:shadow-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all text-sm"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </div>
        </div>

        {/* Certificate viewer */}
        <div className="card-brutal overflow-hidden">
          {isPdf && isDesktop ? (
            // Desktop/laptop: inline PDF
            <iframe title={cred.title} src={cred.file} className="w-full h-[82vh]" />
          ) : cred.fallbackImage ? (
            // Mobile & tablets: always show image
            <div className="bg-paper-dark flex items-center justify-center">
              <img
                src={cred.fallbackImage}
                alt={cred.title}
                loading="eager"
                className="block w-full h-auto max-h-[82vh] object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          ) : isPdf ? (
            <div className="p-6 text-espresso/80">
              This credential is a PDF. On mobile/tablet we show an image for smooth
              zooming, but no image is available.{" "}
              <a href={cred.file} target="_blank" rel="noopener noreferrer" className="underline text-court-dark dark:text-[#60A5FA] hover:text-court dark:hover:text-[#93C5FD]">
                Open the PDF in a new tab
              </a>.
            </div>
          ) : (
            // Non-PDF assets (plain image cert)
            <img
              src={cred.file}
              alt={cred.title}
              className="block w-full h-auto max-h-[82vh] object-contain"
            />
          )}
        </div>

        {/* What I did + Video */}
        {(cred.highlights?.length || video) && (
          <div className="mt-10 grid md:grid-cols-5 gap-6 items-start">
            {/* Highlights */}
            {cred.highlights?.length ? (
              <div className="md:col-span-3 card-brutal p-6">
                <h3 className="text-lg font-heading font-semibold text-espresso mb-3">What I did</h3>
                <ul className="space-y-2 text-espresso/80">
                  {cred.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-court dark:bg-[#60A5FA]" />
                      <p>{h}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Video (YouTube / Drive / file) */}
            {video ? (
              <div className="md:col-span-2">
                <div className="card-brutal overflow-hidden">
                  <div className="aspect-video">
                    {ytEmbed ? (
                      <iframe
                        className="w-full h-full"
                        src={ytEmbed}
                        title={video.title || "Video"}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : driveEmbed ? (
                      <iframe
                        className="w-full h-full"
                        src={driveEmbed}
                        title={video.title || "Video"}
                        loading="lazy"
                        allow="autoplay"
                      />
                    ) : isFileVideo ? (
                      <video
                        className="w-full h-full"
                        controls
                        playsInline
                        poster={video.poster || cred.fallbackImage}
                      >
                        <source src={video.url} />
                        Your browser doesn't support HTML5 video.
                      </video>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-espresso/60 font-mono">
                        Couldn't preview this video type.
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-3 border-t-2 border-espresso/10 flex items-center justify-between">
                    <div className="text-sm text-espresso/70 font-mono">
                      {video.title || "Demo video"}
                    </div>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-court-dark dark:text-[#60A5FA] hover:text-court dark:hover:text-[#93C5FD] text-sm font-medium"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Open video
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
