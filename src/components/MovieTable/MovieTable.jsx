import { useParams } from "react-router-dom";
import css from "./MovieTable.module.css";
import MovieTableItem from "./MovieTableItem";

const MovieTable = ({ data }) => {
  const { type } = useParams();
  const title = type === "movie" ? "title" : "name";

  return (
    <div className={css.additionalData}>
      <MovieTableItem label={"Status"} value={data.status} />
      {title === "title" ? (
        <MovieTableItem label={"Budget"} value={data.budget} />
      ) : (
        <MovieTableItem
          label={"Number of episodes"}
          value={data.number_of_episodes}
        />
      )}
      <MovieTableItem label={"Origin country"} value={data.origin_country[0]} />
      {title === "title" ? (
        <MovieTableItem label={"Revenue"} value={data.revenue} />
      ) : (
        <MovieTableItem
          label={"Number of seasons"}
          value={data.number_of_seasons}
        />
      )}
    </div>
  );
};

export default MovieTable;
