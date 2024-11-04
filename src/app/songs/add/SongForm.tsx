"use client";

import validator from "@rjsf/validator-ajv8";
import Form from "rjsf-layout";
import { Theme as theme } from "@rjsf/mui";
import { schema } from "./song.schema";
import type { TypedField } from "../../../../../../rxp/rjsf-layout/src";
import SongFormLayout from "./SongFormLayout";
import { save } from "./actions";

const SongForm: React.FC<{ layout: TypedField<typeof schema> }> = ({
  layout: children,
}) => {
  return (
    <Form
      {...{ schema, theme, validator, children }}
      dontMemoize
      onSubmit={({ formData }) => save(formData).catch(console.error)}
    >
      {SongFormLayout}
    </Form>
  );
};

export default SongForm;
