import css from "./LoadMoreResults.module.css";

export const LoadMoreResults = ({ handleLoadMore }) => {
  const handleClick = () => {
    handleLoadMore();
  };
  return (
    <div className={css.div}>
    <button type="button" className={css.button} onClick={handleClick}>
      Load More
    </button>
    </div>
  );
};
