import { useNavigate } from "react-router-dom";

export const LoadMoreResults = ({ query, type, page }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/results/?query=${query}&type=${type}&page=${page++}`);
  };
  return (
    <button type="button" onClick={handleClick}>
      Load More
    </button>
  );
};
