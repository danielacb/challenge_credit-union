import { render, screen } from "../../utils/tests";
import InfoItem from ".";

describe("<InfoItem />", () => {
  it("should match the snapshot", () => {
    render(<InfoItem title="Test Title" value="Test Value" />);

    expect(screen).toMatchSnapshot();
  });

  it("should render the component with the correct title and value", () => {
    render(<InfoItem title="Test Title" value="Test Value" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("should apply the default size (medium) styling", () => {
    render(<InfoItem title="Default Size" value="123" />);
    const titleElement = screen.getByText("Default Size");
    const valueElement = screen.getByText("123");

    expect(titleElement).toHaveStyle({
      fontSize: "1rem",
      lineHeight: "1.2rem",
    });
    expect(valueElement).toHaveStyle({ fontSize: "1rem", fontWeight: "700" });
  });

  it("should apply the small size styling", () => {
    render(<InfoItem title="Small Size" value="456" size="small" />);

    const titleElement = screen.getByText("Small Size");
    const valueElement = screen.getByText("456");

    expect(titleElement).toHaveStyle({
      fontSize: "0.8125rem",
      lineHeight: "0.975rem",
    });
    expect(valueElement).toHaveStyle({
      fontSize: "0.8125rem",
      fontWeight: "700",
    });
  });

  it("should apply custom styles from the sx prop", () => {
    render(
      <InfoItem
        title="Custom Styled"
        value="789"
        sx={{ backgroundColor: "red" }}
      />,
    );

    const container = screen.getByText("Custom Styled").parentElement;
    expect(container).toHaveStyle({ backgroundColor: "red" });
  });
});
