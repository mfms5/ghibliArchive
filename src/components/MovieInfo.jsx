/**
 * /movies/${id}
 *
 * Single page that displays all of the information for a movie:
 * Poster, title, release year, running time, rating, description,
 * original and romanized titles, director and producer.
 *
 * Calls the Ghibli API through the movie service to obtain the data.
 * Movie id is obtained from the URL parameter.
 */

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moviesService from "../services/movies";
import Rating from "./Rating";

const MovieInfo = () => {
  const [movie, setMovie] = useState();
  const id = useParams().id;

  // Make GET request to Ghibli API through the service upon loading the page
  useEffect(() => {
    moviesService
      .getMovieById(id)
      .then((foundMovie) => setMovie(foundMovie))
      .catch((error) => console.log("An error occurred: ", error));
  }, []);

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Display given running time (in seconds) with a "Xh Ymin" format
  const formatRunningTime = (runningTime) => {
    const hours = Math.trunc(runningTime / 60);
    const minutes = Math.round(runningTime % 60);

    return `${hours}h ${minutes}min`;
  };

  return (
    <div className="wrapper">
      <div className="movie-info">
        <h1 className="movie-title">{movie.title}</h1>
        <div className="flex flex-row gap-2 mt-2">
          <span>{movie.release_date}</span>
          <span>•</span>
          <span>{formatRunningTime(movie.running_time)}</span>
          <span>•</span>
          <Rating rating={movie.rt_score} />
        </div>
        <div className="lg:flex lg:flex-row lg:justify-center lg:gap-10">
          <img
            className="rounded-lg h-96 w-max mx-auto mt-4"
            src={movie.image}
            alt={movie.title}
          />
          <div className="mt-8">
            <span className="info-section-title">Overview</span>
            <p className="info-section text-pretty">{movie.description}</p>
          </div>
        </div>

        <div className="mt-8">
          <span className="info-section-title">Info</span>
          <ul className="flex flex-col info-section">
            <li className="info-item">
              <span className="info-item-title">Original title:</span>
              <span>
                {movie.original_title} ({movie.original_title_romanised})
              </span>
            </li>
            <li className="info-item">
              <span className="info-item-title">Director:</span>
              <span>{movie.director}</span>
            </li>
            <li className="info-item">
              <span className="info-item-title">Producer:</span>
              <span>{movie.producer}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
