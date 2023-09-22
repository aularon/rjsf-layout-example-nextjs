"use client";

import validator from "@rjsf/validator-ajv8";
import Form, { Field } from "rjsf-layout";
import { Theme as theme } from "@rjsf/mui";
import { schema } from "@/schema";
import { Stack } from "@mui/material";

const UntypedTODOList = () => (
  <Form
    {...{ schema, validator, theme }}
    onSubmit={({ formData }) => console.log(formData)}
  >
    <Field name="title" />
    <Field name="items">
      <Stack direction="row" gap={1} flexWrap="wrap">
        <div style={{ flex: 1 }}>
          <Field name="label" />
        </div>
        <Field name="done" />
        <div style={{ width: "100%" }} />
        <div style={{ flex: 1 }}>
          <Field name="category" />
        </div>
        <Field name="meta">
          <Stack direction="row" columnGap={2}>
            <Field name="priority" />
            <Field name="urgent" />
            <Field name="special" />
          </Stack>
        </Field>
      </Stack>
    </Field>
  </Form>
);

export default UntypedTODOList;
