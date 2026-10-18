// /llms.txt: a plain-text summary of Sam for AI tools (see llmstxt.org).
// Built from the same library files as the site, so it never goes out of date.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { newestFirst, kindLabel, roleLabel } from "../lib";

export const GET: APIRoute = async () => {
  const research = (await getCollection("research")).sort(newestFirst);
  const stage = (await getCollection("stage")).sort(newestFirst);
  const conversations = (await getCollection("conversations")).sort(newestFirst);
  const writing = (await getCollection("writing")).sort(newestFirst);
  const press = (await getCollection("press")).filter((p) => p.data.show).sort(newestFirst);

  const withText = (w?: string[]) => (w && w.length ? ` With ${w.join(", ")}.` : "");
  const appearance = (a: (typeof stage)[number]) =>
    `- [${a.data.title}](${a.data.url}): ${kindLabel(a.data.kind)}, ${roleLabel(a.data.role).toLowerCase()}, ${a.data.where}.${a.data.external ? " External event." : ""}`;

  const text = `# Sam Barlien

> Sam Barlien helps teams with platform engineering and agentic engineering platforms. He is Head of Ecosystem at Platform Engineering (platformengineering.org), the world's largest platform engineering community, where he writes research on best practices drawing on data and conversations with hundreds of platform engineering teams and leaders a year.

Sam co-authors the State of Platform Engineering and State of AI in Platform Engineering reports, helps run the Platform Weekly newsletter, co-hosts PlatformCon (he emceed PlatformCon 2025), and leads the community Ambassador programme. He moderates panels and speaks at events on platform engineering, AI and agentic engineering platforms, and takes on consulting work with platform teams.

Outside platform engineering, Sam is an actor and filmmaker (IMDb: https://www.imdb.com/name/nm9463674/). Credits include Kingdom Come: Deliverance and Chevalier, and his self-funded horror film Embug is in post-production.

Profiles: [LinkedIn](https://www.linkedin.com/in/sam-barlien-3b2579184/), [X](https://x.com/SamBarlien), [GitHub](https://github.com/SamBarlien), [Author page on platformengineering.org](https://platformengineering.org/authors/sam-barlien)

Photo: https://sambarlien.com/sam-barlien.jpg

## Notable conversations

- Spoke on a panel with [Gene Kim](https://www.youtube.com/watch?v=ek8uHQOGodg) at Levi's Stadium, Santa Clara, hosted by Coder with AWS.
- Interviewed Kelsey Hightower (recorded 2026, to be published).
- Moderated a panel with [Aaron Erickson of NVIDIA's Applied AI Lab and Faisal Afzal of AHEAD](https://www.youtube.com/watch?v=Vilrre0P6Zw) in San Francisco.
- Moderated the PlatformCon 2025 London opening panel with [Cornelia Davis (Temporal), Nicki Watt (Trifork) and Rickey Zachary (Thoughtworks)](https://www.youtube.com/watch?v=vMx3puQMROs).
- Interviewed [Abdel Sghiouar of Google, co-host of the Kubernetes Podcast](https://www.youtube.com/watch?v=ypCfKF2byMw).
- Co-wrote [Platform Engineering 2.0](https://platformengineering.org/reports/platform-engineering-2-0-an-evolution-for-the-ai-era) with Pankaj Gupta of Broadcom.

## Research

${research.map((r) => `- [${r.data.title}](${r.data.url}): ${r.data.take}${withText(r.data.with)}`).join("\n")}

## On stage

${stage.map(appearance).join("\n")}

## In conversation

${conversations.map(appearance).join("\n")}

## In the press

${press.map((p) => `- [${p.data.title}](${p.data.url}): ${p.data.publisher}${p.data.author ? `, by ${p.data.author}` : ""}.`).join("\n")}

## Optional

${writing.map((w) => `- [${w.data.title}](${w.data.url}): Article on platformengineering.org.`).join("\n")}
`;

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
