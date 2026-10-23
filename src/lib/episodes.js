// Episode helpers shared by the app (SeriesPage, ProjectsPage) and the build
// (generate-static-pages.js, check-content-rules.js). Plain JS so Node can import
// it without a compile step; types live in episodes.d.ts.
// Episodes come from src/data/episodes.json. Only published episodes go in it,
// so whatever is listed there is public.

// Newest first: by posted date, then by episode number
export const newestFirst = (eps) =>
  [...eps].sort((a, b) => b.posted.localeCompare(a.posted) || b.n - a.n);

export const latestEpisode = (eps) => newestFirst(eps)[0];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2026-10-23" -> "Oct 23, 2026". Parsed by hand so no timezone can shift the day.
export const formatPosted = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

// Schema.org uploadDate wants a full ISO time with an offset. The data only
// records the Pacific posting day, not the exact time, so noon Pacific stands
// in for it. -07:00 is PDT, right for Season 1 (October); a winter episode
// would want -08:00.
export const uploadDateTime = (iso) => `${iso}T12:00:00-07:00`;

export const shortEmbed = (youtubeId) =>
  `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`;
