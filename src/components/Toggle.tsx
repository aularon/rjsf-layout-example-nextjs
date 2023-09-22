import { ReactElement } from "react";
import { Tooltip } from "@mui/material";

import type { FieldProps, FieldTemplateProps } from "@rjsf/utils";

type ToggleProps = Omit<FieldTemplateProps<boolean | undefined>, "onChange"> & {
  onChange: FieldProps<boolean | undefined>["onChange"];
};

const Toggle: React.FC<ToggleProps> = ({
  formData: active,
  onChange: setActive,
  id,
}) => (
  <Tooltip
    style={{
      opacity: active ? 1 : 0.5,
      cursor: "pointer",
    }}
    title={`${active ? "Is" : "Not"} ${id.split("_").pop()}`}
    onClick={() => setActive(!active)}
  >
    {icons[id.split("_").pop()!]}
  </Tooltip>
);

import { Stars, AssignmentLate } from "@material-ui/icons";
const icons: Record<string, ReactElement> = {
  special: <Stars color="primary" />,
  urgent: <AssignmentLate color="error" />,
};

export default Toggle;
