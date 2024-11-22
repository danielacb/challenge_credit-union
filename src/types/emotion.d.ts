import "@emotion/react";
import { Theme as MUITheme } from "@mui/material";

declare module "@emotion/react" {
  export type Theme = MUITheme;
}
