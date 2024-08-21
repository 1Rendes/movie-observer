import css from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={css.div}>
      <p className={css.par}>Application created for educational purposes.</p>
      <p className={css.par}>
        Information provided for informational purposes, citation only with
        reference to the{" "}
        <a className={css.link} href="https://www.themoviedb.org/">
          original source
        </a>
        ,
        <a className={css.link} href="https://www.themoviedb.org/terms-of-use">
          {" "}
          all rights reserved
        </a>
        , 2024.
      </p>
      <div className={css.links}>
        <a className={css.link} href="mailto: 1admin@ukr.net">
          Contact us
        </a>
        <a className={css.link} href="https://github.com/1Rendes">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Footer;
