import { render, screen } from "../../utils/tests";
import { LoanProps } from "../../api";
import LoanCard from ".";

const mockLoan: LoanProps = {
  id: "bd1",
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
    id: "5302b",
    vin: "JT3HN86R0W0135727",
    year: "2019",
    make: "HONDA",
    model: "ACCORD",
    mileage: 41855,
    estimatedListPrice: null,
    registrationDate: "10/2019",
    state: null,
    imageSource: "https://example.com/car.jpg",
  },
};

describe("<LoanCard />", () => {
  it("should match the snapshot", () => {
    render(<LoanCard loan={mockLoan} />);

    expect(screen).toMatchSnapshot();
  });

  it("should render without crashing", () => {
    render(<LoanCard loan={mockLoan} />);

    // Check for the car title
    expect(screen.getByText("2019 Honda Accord")).toBeInTheDocument();

    // Check for the lender title
    expect(screen.getByText("Santander Consumer Usa")).toBeInTheDocument();

    // Check for the monthly payment amount
    expect(screen.getByText("$157/month")).toBeInTheDocument();
  });

  it("should display the loan data correctly", () => {
    render(<LoanCard loan={mockLoan} />);

    // Check for the APR value
    expect(screen.getByText("APR")).toBeInTheDocument();
    expect(screen.getByText("18.3%")).toBeInTheDocument();

    // Check for the remaining time
    expect(screen.getByText("Time remaining")).toBeInTheDocument();
    expect(screen.getByText("66 mon")).toBeInTheDocument();

    // Check for the original amount
    expect(screen.getByText("Estimated 6,509 mil")).toBeInTheDocument();
  });

  it("should render the car image with correct src and alt attributes", () => {
    render(<LoanCard loan={mockLoan} />);

    // Check that the image is rendered correctly
    const carImage = screen.getByRole("img", {
      name: /2019 Honda Accord/i,
    });
    expect(carImage).toBeInTheDocument();
    expect(carImage).toHaveAttribute("src", "https://example.com/car.jpg");
  });

  it("should contain the Start Saving button", () => {
    render(<LoanCard loan={mockLoan} />);

    // Check for the button
    const button = screen.getByRole("button", { name: /Start Saving/i });
    expect(button).toBeInTheDocument();
  });

  it("should contain the menu icon button", () => {
    render(<LoanCard loan={mockLoan} />);

    // Check for the menu icon button
    const iconButton = screen.getByLabelText("open menu");
    expect(iconButton).toBeInTheDocument();
  });
});
