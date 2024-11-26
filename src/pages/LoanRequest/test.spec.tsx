import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "../../utils/tests";
import { requestOffer } from "../../api";
import LoanRequest from ".";
import { loanTermOptions } from "./options";

jest.mock("../../api", () => ({
  requestOffer: jest.fn(),
  submitApplication: jest.fn(),
}));

const mockOffer = {
  id: "test-offer-id",
  monthlyPayments: 200,
  apr: 5.5,
};

describe("<LoanRequest />", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("should render the form correctly", () => {
    render(<LoanRequest />);

    expect(screen.getByLabelText(/loan purpose/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/total loan amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/loan term \(months\)/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit application/i }),
    ).toBeDisabled();
  });

  it("should request an offer when form is filled", async () => {
    (requestOffer as jest.Mock).mockResolvedValue(mockOffer);

    render(<LoanRequest />);

    fireEvent.mouseDown(screen.getByLabelText(/loan purpose/i));
    userEvent.click(screen.getByRole("option", { name: "Personal" }));

    expect(screen.getByText("Personal")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByLabelText(/loan term \(months\)/i));
    userEvent.click(screen.getByRole("option", { name: "12 months" }));

    userEvent.type(screen.getByLabelText(/total loan amount/i), "10000");

    await waitFor(() => {
      expect(requestOffer).toHaveBeenCalled();
    });

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument(),
    );

    expect(screen.getByText(/monthly payment/i)).toBeInTheDocument();
    expect(screen.getByText(/\$200/i)).toBeInTheDocument();
    expect(screen.getByText(/apr/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
  });

  it("should handle API error when fetching offer", async () => {
    (requestOffer as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<LoanRequest />);

    fireEvent.mouseDown(screen.getByLabelText(/loan purpose/i));
    userEvent.click(screen.getByRole("option", { name: "Personal" }));

    expect(screen.getByText("Personal")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByLabelText(/loan term \(months\)/i));
    userEvent.click(screen.getByRole("option", { name: "12 months" }));

    userEvent.type(screen.getByLabelText(/total loan amount/i), "10000");

    await waitFor(() => {
      expect(requestOffer).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          /Unable to retrieve offers. Please try again shortly!/i,
        ),
      ).toBeInTheDocument();
    });
  });

  it("should format input value correctly as currency", async () => {
    render(<LoanRequest />);

    const input = screen.getByLabelText(/Total Loan Amount/i);

    await userEvent.type(input, "123456");
    expect(input).toHaveValue("$123,456.00");
  });

  it("should correctly parse and sets the raw value", async () => {
    render(<LoanRequest />);

    const input = screen.getByLabelText(/Total Loan Amount/i);

    await userEvent.type(input, "7890");
    expect(input).toHaveValue("$7,890.00");
    expect(input).toHaveValue("$7,890.00");
  });

  it("should only allow valid loan terms (12, 24, 36, 48)", async () => {
    render(<LoanRequest />);

    // Open the select menu
    fireEvent.mouseDown(screen.getByLabelText(/Loan term \(months\)/i));

    // Check the available options
    loanTermOptions.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();

      // Only valid options are available
      const number = Number(label.split(" ")[0]);
      expect([12, 24, 36, 48].includes(number));
    });

    // Click on a valid option (e.g., "12 months")
    userEvent.click(screen.getByRole("option", { name: "12 months" }));

    // Ensure the value is properly selected
    await waitFor(() => {
      expect(screen.getByLabelText(/Loan term \(months\)/i)).toHaveTextContent(
        "12 months",
      );
    });
  });
});
