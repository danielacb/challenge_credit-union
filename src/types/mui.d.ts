import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    lorem: LoremPaletteColor;
  }

  interface PaletteOptions {
    lorem?: LoremPaletteOptions;
  }
}

interface LoremPaletteColor {
  primary: string;
  gray: {
    "100": string;
    "200": string;
    "300": string;
    "500": string;
    "700": string;
    "800": string;
    "900": string;
  };
  green: {
    "100": string;
    "500": string;
  };
}

interface LoremPaletteOptions {
  primary: string;
  gray: {
    "100": string;
    "200": string;
    "300": string;
    "500": string;
    "700": string;
    "800": string;
    "900": string;
  };
  green: {
    "100": string;
    "500": string;
  };
}
