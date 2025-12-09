/**
 * Renders each movie in the list as a MovieCard.
 *
 * Contains functions to filter and sort the movie list. These functions are called from componentes
 * Search and Sort, through a reference to this component, upon user input.
 * Since the API doesn't provide endpoints to filter or sort the results at the moment,
 * these operations are done manually on the list that contains all available movies.
 * The functions that perform the sorting and filtering are imported from ../utils/movieListOperations.js.
 */

import { useState, useEffect, useImperativeHandle } from "react";
import moviesService from "../services/movies";
import MovieCard from "./MovieCard";
import {
  filterByTitle,
  sortByRating,
  sortByYear,
} from "../utils/movieListOperations";

const MovieList = ({ ref }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [sortType, setSortingType] = useState("yearAsc");

  // Make GET request to Ghibli API through the service to obtain all movies upon loading the page.
  useEffect(() => {
    moviesService
      .getAllMovies()
      .then((movies) => {
        setAllMovies(movies);
        setMoviesToShow(movies);
      })
      .catch((error) => console.log("Error fetching movies: ", error));
  }, []);

  /**
   * Called from the Search component when the user enters text in the textbox.
   * The selected sorting method is applied to the search result as well.
   * If no search term has been entered (or if the textbox has been cleared), all movies are displayed.
   */
  const filterSearch = (searchTerm) => {
    if (!searchTerm) {
      sortMovies(allMovies);
    } else {
      sortMovies(filterByTitle(searchTerm, allMovies));
    }
  };

  /**
   * Executed every time the state variable sortType changes after the user selects a sorting method,
   * or after the movie list is filtered by title, to maintain the selected order.
   */
  const sortMovies = (moviesToSort) => {
    switch (sortType) {
      // Default order in the API
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

  // References used by Search and Sort components to call these functions
  useImperativeHandle(ref, () => {
    return { filterSearch, setSortingType };
  });

  // API request has not been satisfied yet
  if (allMovies.length === 0) return <div>Loading...</div>;

  // No movies meet the search criteria
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
