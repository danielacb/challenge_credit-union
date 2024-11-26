import { fireEvent, render, screen, waitFor } from "../../utils/tests";
import Confirmation from ".";
import { getLoansByUser } from "../../api";

jest.mock("../../api", () => ({
  getLoansByUser: jest.fn(),
}));

const mockLoanData = {
  loansAvailable: [
    {
      id: "4f198633",
      lender: "SANTANDER CONSUMER USA",
      apr: "18.3",
      balance: 6509,
      issueDate: "08/19",
      monthlyPayments: 157,
      originalAmount: 6850,
      originalMonths: 72,
      remainingMonths: 66,
      automobile: {
        isRefinanceable: true,
        id: "685302b",
        vin: "JT3HN86R0W0135727",
        year: "2019",
        make: "HONDA",
        model: "ACCORD",
        trim: null,
        mileage: 41855,
        estimatedListPrice: null,
        registrationDate: "10/2019",
        state: null,
        imageSource: "https://example.com/car.jpg",
      },
    },
    {
      id: "b8c0",
      lender: "CAPITAL ONE AUTO FINAN",
      apr: "14.64",
      balance: 23320,
      issueDate: "06/19",
      monthlyPayments: 533,
      originalAmount: 26636,
      originalMonths: 78,
      remainingMonths: 58,
      automobile: {
        isRefinanceable: true,
        id: "0fcb",
        vin: "WDBHA29G5XA724359",
        year: "2018",
        make: "CHEVROLET",
        model: "CAMARO 2D 2LT",
        mileage: 39649,
        estimatedListPrice: null,
        registrationDate: "04/2019",
        state: null,
        imageSource: "https://example.com/car.jpg",
      },
    },
  ],
};

describe("<Confirmation />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the fallback UI if userId is not present", () => {
    render(<Confirmation />);

    expect(
      screen.getByText(
        /It looks like you haven't completed the loan request yet/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Go to the form/i }),
    ).toBeInTheDocument();
  });

  it("should call getLoansByUser API when userId is present", async () => {
    (getLoansByUser as jest.Mock).mockResolvedValue(mockLoanData);

    render(<Confirmation />, {
      initialEntries: [{ state: { userId: "12345" } }],
    });

    await waitFor(() => {
      expect(getLoansByUser).toHaveBeenCalledWith("12345");
    });
  });

  it("should show a loading spinner while waiting for API data", async () => {
    (getLoansByUser as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockLoanData), 100)),
    );

    render(<Confirmation />, {
      initialEntries: [{ state: { userId: "12345" } }],
    });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  it("should display an error alert if the API call fails", async () => {
    (getLoansByUser as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<Confirmation />, {
      initialEntries: [{ state: { userId: "12345" } }],
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          /Unable to retrieve loans. Please try again shortly!/i,
        ),
      ).toBeInTheDocument();
    });
  });

  it("should display loan data when API call is successful", async () => {
    (getLoansByUser as jest.Mock).mockResolvedValue(mockLoanData);

    render(<Confirmation />, {
      initialEntries: [{ state: { userId: "12345" } }],
    });

    await waitFor(() => {
      expect(screen.getByText(/6,509/i)).toBeInTheDocument();
      expect(screen.getByText(/23,320/i)).toBeInTheDocument();

      const cards = screen.getAllByTestId("loan-card");
      expect(cards).toHaveLength(2);
    });
  });

  it("should display a message when no loans are found", async () => {
    (getLoansByUser as jest.Mock).mockResolvedValue({ loansAvailable: [] });

    render(<Confirmation />, {
      initialEntries: [{ state: { userId: "12345" } }],
    });

    await waitFor(() => {
      expect(screen.getByText(/no loans found/i)).toBeInTheDocument();
    });
  });
});
