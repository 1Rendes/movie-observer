import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { Form } from "./Form";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.element, isActive && css.active);
  };

  return (
    <div className={css.navigation}>
      <header className={css.header}>
        <nav className={css.buttons}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
        </nav>
        <Form />
      </header>
    </div>
  );
};

export default Navigation;
