import type { JSONSchemaObject } from "rjsf-layout";

export const genres = ["Country", "Jazz", "Classic", "Rock"] as const;
export const schema = {
  title: "Song",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "Track 8" }, // Track 8 is the best song
    genre: { type: "string", enum: genres },
    participations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          role: { type: "string", enum: ["Singer", "Lyricist", "Composer"] },
        },
      },
    },
  },
} as const satisfies JSONSchemaObject;
