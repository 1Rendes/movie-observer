import placeholder from "../../img/placeholder-image.webp";
import css from "./MovieImageBlock.module.css";

const MovieImageBlock = ({ children, data }) => {
  return (
    <>
      <img
        className={css.img}
        src={
          data
            ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
            : placeholder
        }
        alt=""
      />
      {data && (
        <div
          className={css.textContent}
          style={{
            backgroundImage: `linear-gradient(to right, rgb(45, 45, 45), rgba(45,45,45, 0.7), rgb(45, 45, 45)), url(https://image.tmdb.org/t/p/w500/${
              data && data.backdrop_path
            })`,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default MovieImageBlock;
