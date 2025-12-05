import { useState, useEffect, useImperativeHandle } from "react";
import moviesService from "../services/movies";
import MovieCard from "./MovieCard";
import {
  filterByTitle,
  sortByRating,
  sortByYear,
} from "../utils/movieListOperations";

const MovieList = (props) => {
  const [allMovies, setAllMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [sortType, setSortingType] = useState("yearAsc");

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
      sortMovies(allMovies);
    } else {
      sortMovies(filterByTitle(searchTerm, allMovies));
    }
  };

  const sortMovies = (moviesToSort) => {
    switch (sortType) {
      //Default order in the API
      case "yearAsc":
        setMoviesToShow(sortByYear(moviesToSort, true));
        break;
      case "yearDes":
        setMoviesToShow(sortByYear(moviesToSort, false));
        break;
      case "ratingAsc":
        setMoviesToShow(sortByRating(moviesToSort, true));
        break;
      case "ratingDes":
        setMoviesToShow(sortByRating(moviesToSort, false));
        break;
    }
  };

  useEffect(() => sortMovies(moviesToShow), [sortType]);

  useImperativeHandle(props.ref, () => {
    return { filterSearch, setSortingType };
  });

  if (allMovies.length === 0) return <div>Loading...</div>;

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
