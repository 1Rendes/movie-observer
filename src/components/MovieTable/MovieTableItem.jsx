import css from "./MovieTable.module.css";

const MovieTableItem = ({ value = "-", label }) => {
  return (
    <div className={css.addElement}>
      <p className={css.headPar}>{label}: </p>
      <p className={css.par}>{value}</p>
    </div>
  );
};

export default MovieTableItem;
