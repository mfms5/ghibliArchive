import { useState, useEffect, useImperativeHandle } from "react";
import moviesService from "../services/movies";
import MovieCard from "./MovieCard";
import { filterByTitle } from "../utils/movieFiltering";

const MovieList = (props) => {
  const [allMovies, setAllMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);

  useEffect(() => {
    moviesService
      .getAllMovies()
      .then((movies) => {
        setAllMovies(movies);
        setMoviesToShow(movies);
      })
      .catch((error) => console.log("Error fetching movies: ", error));
  }, []);

  const filterSearch = (searchTerm) => {
    if (!searchTerm) {
      setMoviesToShow(allMovies);
    } else {
      setMoviesToShow(filterByTitle(searchTerm, allMovies));
    }
  };

  useImperativeHandle(props.ref, () => {
    return { filterSearch };
  });

  if (!allMovies) return <div>Loading...</div>;

  if (moviesToShow.length === 0) return <div>No movies found!</div>;

  return (
    <div className="movie-list">
      <ul>
        {moviesToShow.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterUrl={movie.image}
            year={movie.release_date}
            rating={movie.rt_score}
            id={movie.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
