import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";

interface AllTheProvidersProps {
  children: ReactNode;
  initialEntries?: MemoryRouterProps["initialEntries"];
}

const AllTheProviders = ({
  children,
  initialEntries,
}: AllTheProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        initialEntries={initialEntries}
      >
        {children}
      </MemoryRouter>
    </ThemeProvider>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialEntries?: MemoryRouterProps["initialEntries"];
}

const customRender = (
  ui: ReactElement,
  { initialEntries, ...options }: CustomRenderOptions = {},
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders initialEntries={initialEntries}>
        {children}
      </AllTheProviders>
    ),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
