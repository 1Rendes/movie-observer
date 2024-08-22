import css from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={css.div}>
      <p className={css.par}>
        Application based on{" "}
        <a
          className={css.link}
          target="blank"
          href="https://developer.themoviedb.org/docs/getting-started"
        >
          {" "}
          TMDB API.
        </a>
      </p>
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
        <a
          target="blank"
          className={css.link}
          href="https://www.linkedin.com/in/volodymyr-solonin-0575b22a6/"
        >
          LinkedIn
        </a>
        <a target="blank" className={css.link} href="mailto: 1admin@ukr.net">
          Contact us
        </a>
        <a
          target="blank"
          className={css.link}
          href="https://github.com/1Rendes/movie-observer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Footer;
