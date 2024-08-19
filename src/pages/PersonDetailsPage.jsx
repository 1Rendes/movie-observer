import { useLocation, useParams } from "react-router-dom";
import { useSelect } from "../hooks/useSelect";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import BackLinkButton from "../components/BackLinkButton";
import placeholder from "../img/placeholder-actor.jpg";

const PersonDetailsPage = () => {
  const { id } = useParams();
  const type = "person";
  const query = "";
  const endpoint = useSelect(type, query, id);
  const { data, error } = useFetch(endpoint);
  const location = useLocation();
  const backLinkValue = location.state ?? "/";
  const [backLink] = useState(backLinkValue);
  console.log(location);

  error && toast.error(error);

  return (
    <div>
      <BackLinkButton to={backLink} />
      <Toaster />
      {data && (
        <div>
          <img
            src={
              data
                ? `https://image.tmdb.org/t/p/w500/${data.profile_path}`
                : placeholder
            }
            alt=""
          />
          <h2>{data.name}</h2>
          <p>
            <b>Knows for department:</b> {data.known_for_department}
          </p>
          <p>
            <b>Birthday:</b> {data.birthday.split("-").join(".")}
          </p>
          <p>
            <b>Place of birth:</b> {data.place_of_birth}
          </p>
          <p>
            <b>Biography: </b>
            {data.biography}
          </p>
          <p>
            <b>Gender: </b>
            {data.gender === 2 ? "Male" : "Female"}
          </p>
          {data.deathday && (
            <p>
              <b>Deathday: </b>
              {data.deathday.split("-").join(".")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonDetailsPage;
