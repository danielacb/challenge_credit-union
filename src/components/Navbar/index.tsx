import { Link } from "react-router-dom";

import Logo from "/LoremCreditUnion.svg";
import { Nav } from "./styles";

export default function Navbar() {
  return (
    <Nav>
      <Link to="/">
        <img src={Logo} alt="Logo of Lorem Credit Union" />
      </Link>
    </Nav>
  );
}
