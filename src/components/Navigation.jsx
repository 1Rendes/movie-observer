import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { Form } from "./Form";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Navigation = () => {
  const [mobMenu, setMobMenu] = useState(false);
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.element, isActive && css.active);
  };
  const onMobMenu = () => {
    if (mobMenu) {
      setMobMenu(false);
    } else {
      setMobMenu(true);
    }
  };

  return (
    <div className={css.navigation}>
      <header className={css.header}>
        <nav className={css.buttons}>
          <NavLink
            to="/"
            className={clsx(
              buildLinkClass,
              mobMenu && css.isMobMenu,
              css.element
            )}
          >
            MOVIE<span className={css.span}>Observer</span>
          </NavLink>
        </nav>
        <Form mobMenu={mobMenu} />
        <button className={css.menuButton} onClick={onMobMenu}>
          <FaSearch className={css.FaSearch} />
        </button>
      </header>
    </div>
  );
};

export default Navigation;
