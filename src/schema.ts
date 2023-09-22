import type { JSONSchemaObject } from "rjsf-layout";

const itemCategories = ["grocery", "work", "personal"] as const;
export type ItemCategory = (typeof itemCategories)[number];
const workPriorities = ["high", "medium", "low"] as const;
export type WorkPriority = (typeof workPriorities)[number];

export const schema = {
  title: "TODO List",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "My TODO List" },
    items: {
      type: "array",
      items: {
        type: "object",
        // ⭐ The required attribute reflects on types
        required: ["label", "category"],
        properties: {
          label: { type: "string" },
          category: {
            // ⭐ Types, naturally, are reflected in types
            type: "string",
            // ⭐ enums are forced via unions as well!
            // Be sure to have referenced enums `as const` unless you are directly including them here
            enum: itemCategories,
          },
          done: { type: "boolean", title: "Done?", default: false },
          meta: {
            // ⭐ Nested objects/arrays
            type: "object",
            properties: {
              special: { type: "boolean" },
              urgent: { type: "boolean" },
              priority: {
                type: "string",
                enum: workPriorities,
                default: "low",
              },
            },
          },
        },
      },
    },
  },
  // This last bit is important, the `as const` parts narrows down types,
  // while the `satisfies JSONSchemaObject` gives you autocomplete and marks the resulting object
} as const satisfies JSONSchemaObject;
