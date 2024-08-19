import { useParams } from "react-router-dom";
import { useSelect } from "../hooks/useSelect";
import { useFetch } from "../hooks/useFetch";
import VideoPlayer from "./VideoPlayer";
import toast from "react-hot-toast";
import { useEffect } from "react";

const MovieVideoList = () => {
  const { type, id } = useParams();
  const endpoint = useSelect(type, "", id, "videos");
  const { data, error } = useFetch(endpoint);
  console.log(data);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      {data && (
        <ul>
          {data.results.map(({ id, name, key }) => (
            <li key={id}>
              <VideoPlayer
                video={`https://www.youtube.com/embed/${key}`}
                name={name}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieVideoList;
