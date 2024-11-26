import { screen } from "./utils/tests";
import { render } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("should render LoanRequest page on the home route", () => {
    render(<App />);

    expect(screen.getByText("Loan Information")).toBeInTheDocument();
  });
});
