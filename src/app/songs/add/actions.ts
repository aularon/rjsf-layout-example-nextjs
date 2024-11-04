"use server";

import type { FromSchema } from "rjsf-layout";
import { schema } from "./song.schema";
import validator from "@rjsf/validator-ajv8";

const validate = validator.ajv.compile(schema);
const typedValidate = (data: unknown) => {
  if (!validate(data)) throw new TypeError();

  return data as FromSchema<typeof schema>;
};

export const save = async (input: unknown) => {
  const data = typedValidate(input);
  const { title, participations } = data;

  console.log("@", title, participations);
};
