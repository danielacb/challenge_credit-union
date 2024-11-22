import Logo from "/LoremCreditUnion.svg";
import { Nav } from "./styles";

export default function Navbar() {
  return (
    <Nav>
      <a href="/">
        <img src={Logo} alt="Logo of Lorem Credit Union" />
      </a>
    </Nav>
  );
}
