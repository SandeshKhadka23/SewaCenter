import { Link } from "react-router-dom";
import logo from "../../assets/images/sewacenterlogo.png";

export default function Logo() {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="SewaCenter"
        className="h-14 w-auto"
      />
    </Link>
  );
}