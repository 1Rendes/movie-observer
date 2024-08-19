import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const BackLinkButton = ({ to, children }) => {
  return (
    <Link to={to}>
      <HiArrowLeft size="24" />
      {children}
    </Link>
  );
};

export default BackLinkButton;
