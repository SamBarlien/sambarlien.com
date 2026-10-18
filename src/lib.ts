// Small helpers shared by the pages.
export const newestFirst = <T extends { data: { date: string } }>(a: T, b: T) =>
  b.data.date.localeCompare(a.data.date);

const kinds: Record<string, string> = {
  talk: "Talk", panel: "Panel", podcast: "Podcast", webinar: "Webinar", interview: "Interview",
};
const roles: Record<string, string> = {
  speaker: "Speaker", panelist: "Panelist", moderator: "Moderator", host: "Host", guest: "Guest",
};
export const kindLabel = (k: string) => kinds[k] ?? k;
export const roleLabel = (r: string) => roles[r] ?? r;
export const withLabel = (w?: string[]) => (w && w.length ? `With ${w.join(", ")}` : undefined);
