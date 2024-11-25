import "@emotion/react";
import { Theme as LibTheme } from "@mui/material";
declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends LibTheme {}
}
