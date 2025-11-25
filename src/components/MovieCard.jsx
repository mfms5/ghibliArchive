import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const MovieCard = ({ title, posterUrl, year, rating, id }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card group" onClick={() => navigate(`/movies/${id}`)}>
      <img className="rounded-lg w-full h-auto" src={posterUrl} alt={title} />
      <h3>{title}</h3>
      <div className="info">
        <p>{year}</p>
        <Rating rating={rating} />
      </div>
    </div>
  );
};

export default MovieCard;
