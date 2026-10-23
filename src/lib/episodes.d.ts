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
export function newestFirst(eps: Episode[]): Episode[];
export function latestEpisode(eps: Episode[]): Episode | undefined;
export function formatPosted(iso: string): string;
export function uploadDateTime(iso: string): string;
export function shortEmbed(youtubeId: string): string;
