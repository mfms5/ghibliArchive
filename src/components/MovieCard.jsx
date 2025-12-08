/**
 * Represents a movie in the main page's movie list.
 * Displays the movie's poster, title, release year and rating.
 * Clicking a card opens the movie info page.
 */

import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const MovieCard = ({ title, posterUrl, year, rating, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="movie-card group"
      data-testid="movieCard"
      onClick={() => navigate(`/movies/${id}`)}
    >
      <img className="rounded-lg w-full h-auto" src={posterUrl} alt={title} />
      <h3>{title}</h3>
      <div className="flex justify-between">
        <p>{year}</p>
        <Rating rating={rating} />
      </div>
    </div>
  );
};

export default MovieCard;
