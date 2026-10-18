// Tells Astro where the library lives and what each entry must contain.
// If an entry is missing a required field, the build stops and says which one.
import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";
import yaml from "js-yaml";

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// The YAML files are plain lists; this gives each entry an id from its title.
const fromList = (path: string) =>
  file(path, {
    parser: (text) =>
      (yaml.load(text) as Record<string, unknown>[]).map((entry, i) => ({
        id: `${String(i).padStart(3, "0")}-${slug(String(entry.title))}`.slice(0, 80),
        ...entry,
      })),
  });

const base = {
  title: z.string(),
  url: z.string().url(),
  date: z.string(),
  with: z.array(z.string()).optional(),
  highlight: z.boolean().default(false),
};

const appearance = z.object({
  ...base,
  kind: z.enum(["talk", "panel", "podcast", "webinar", "interview"]),
  role: z.string(),
  where: z.string(),
  external: z.boolean().default(false),
});

export const collections = {
  research: defineCollection({
    loader: fromList("library/research.yaml"),
    schema: z.object({ ...base, take: z.string() }),
  }),
  writing: defineCollection({
    loader: fromList("library/writing.yaml"),
    schema: z.object(base),
  }),
  stage: defineCollection({ loader: fromList("library/on-stage.yaml"), schema: appearance }),
  conversations: defineCollection({ loader: fromList("library/conversations.yaml"), schema: appearance }),
  press: defineCollection({
    loader: fromList("library/press.yaml"),
    schema: z.object({
      title: z.string(),
      publisher: z.string(),
      author: z.string().optional(),
      url: z.string().url(),
      date: z.string(),
      show: z.boolean().default(false),
    }),
  }),
};
