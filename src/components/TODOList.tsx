"use client";

import validator from "@rjsf/validator-ajv8";
import Form from "rjsf-layout";

import { Theme } from "@rjsf/mui";

import { Grid, Stack, Checkbox, Button } from "@mui/material";
import React from "react";
import { ItemCategory, schema } from "@/schema";
import Toggle from "./Toggle";

const TODOList: React.FC = () => (
  <Form
    // The usual schema
    schema={schema}
    // ⭐ Inferred data type based on the passed schema — You get autocomplete here!
    formData={{
      title: "Mixed TODOs",
      items: [
        {
          label: "PO-TAY-TOES",
          category: "grocery", // enum-based fields are typed, too
          meta: {
            special: true,
          },
        },
      ],
    }}
    // The mandatory validator
    validator={validator}
    // Optional Theme
    theme={Theme}
    // Custom submit button
    submitter={
      <Button type="submit" fullWidth variant="contained">
        Save
      </Button>
    }
  >
    {/*
      ⭐ The capitalized Title and Items are the field components
      ⭐ The $-prefixed $title and $items contain current data
      ⭐ formData contains the full data object
      ⭐ Everything is typed. Be it the data variables or the field components
    */}
    {({ Title, Items, formData, $title, $items }) => (
      <Stack direction="row" style={{ width: "100%" }} gap={1}>
        <Stack gap={1} style={{ flex: 1 }}>
          <Stack direction="row" style={{ width: "100%" }}>
            <h1 style={{ margin: 0, flex: 1 }}>
              {/* ⭐ Construct info string from the stateful $title and $item variables */}
              {$title}
            </h1>
            {$items?.length ? (
              <p>
                {$items.length} items:{" "}
                {$items.filter((item) => item.done).length} done,{" "}
                {
                  $items.filter(
                    (item) => !item.done && item.meta?.priority === "high"
                  ).length
                }{" "}
                high priority and{" "}
                {
                  $items.filter((item) => !item.done && item.meta?.urgent)
                    .length
                }{" "}
                urgent!
              </p>
            ) : null}
          </Stack>
          <Title />
          <Items>
            {/*
            ⭐ Layout for each item
            ⭐ The `Field` is a typed field component. Check its use below
          */}
            {({ Field, Category, Done, Meta, $category, $done, $label }) => (
              <Grid
                container
                spacing={1}
                style={{
                  // ⭐ Using the stateful variables to control some styling "aspects"
                  opacity: $done ? 0.5 : 1,
                  backgroundColor:
                    $label === "PO-TAY-TOES!"
                      ? "gold" // although old
                      : $category && categoryColors[$category],
                }}
              >
                <Grid item xs={12}>
                  <Stack direction="row">
                    <div style={{ flex: 1 }}>
                      {/* ⭐ This below is equivalent to using the Named Field version <Label />  */}
                      <Field name="label" />
                    </div>
                    <Meta>
                      {/*
                      ⭐ Display two out of the nested `.item.meta` three fields.
                        The third would be displayed in another place altogether.
                      */}
                      {({ Urgent, Special }) => (
                        <Stack
                          direction="row"
                          style={{
                            paddingTop: "15px",
                          }}
                          columnGap={1}
                        >
                          {/* ⭐ Pass in a component that implements FieldTemplate */}
                          <Urgent>{Toggle}</Urgent>
                          {/* Reusing Toggle which accepts FieldTemplateProps<boolean> */}
                          <Special>{Toggle}</Special>
                        </Stack>
                      )}
                    </Meta>
                    <Done>
                      {({ $done, setDone }) => (
                        // ⭐ Inline custom field!
                        <Checkbox
                          title="Done?"
                          checked={$done}
                          onClick={() => setDone(!$done)}
                        />
                      )}
                    </Done>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  {/*
                  ⭐ Invoking the field without passing children would render its default implementation,
                  which is a select menu in this case (MUI theme's <Select /> since we use MUI theme here!)
                */}
                  <Category />
                </Grid>
                <Grid item xs={8}>
                  {/* ⭐ Displaying another part of the split `.item.meta` nested fields */}
                  <Meta>
                    {({ Priority }) => (
                      <Stack direction="row">
                        {/* ⭐ Conditional field display */}
                        {$category === "work" && <Priority />}
                      </Stack>
                    )}
                  </Meta>
                </Grid>
              </Grid>
            )}
          </Items>
        </Stack>
        <pre
          style={{
            background: "#eee",
            padding: 3,
            borderRadius: 3,
            border: "1px solid #111",
            maxWidth: "25%",
            overflow: "auto",
          }}
        >
          {JSON.stringify(formData, null, 2)}
        </pre>
      </Stack>
    )}
  </Form>
);

const categoryColors = {
  grocery: "#f0fff0",
  personal: "#f0f7ff",
  work: "#fffff0",
} satisfies Record<ItemCategory, string>;

export default TODOList;
