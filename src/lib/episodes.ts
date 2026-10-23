// Episodes of a series page (projectPages.json, kind "series"). Only published
// episodes live in the data, so whatever is listed is public.
export type Episode = {
  n: number;
  title: string;
  posted: string; // YYYY-MM-DD, Pacific
  line: string;
  youtubeId: string;
  tiktok: string;
  instagram: string;
  cover: string;
  coverAlt: string;
};

// Newest first: by posted date, then by episode number
export const newestFirst = (eps: Episode[]) =>
  [...eps].sort((a, b) => b.posted.localeCompare(a.posted) || b.n - a.n);

export const latestEpisode = (eps: Episode[]) => newestFirst(eps)[0];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-10-23" -> "Oct 23, 2026". Parsed by hand so no timezone can shift the day.
export const formatPosted = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

export const shortEmbed = (youtubeId: string) =>
  `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`;
