import Navbar from ".";
import { render, screen } from "../../utils/tests";

describe("<Navbar />", () => {
  it("should match the snapshot", () => {
    render(<Navbar />);

    expect(screen).toMatchSnapshot();
  });

  it('contains a link that navigates to the home page ("/")', () => {
    render(<Navbar />);
    const homeLink = screen.getByRole("link", {
      name: /Logo of Lorem Credit Union/i,
    });
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
