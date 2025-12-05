import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { server } from "../../testSetup";
import { http, HttpResponse } from "msw";
import MovieList from "../components/MovieList";
import * as movieListOperations from "../utils/movieListOperations";

describe("<MovieList />", () => {
  //API call mocked with MSW
  test("Renders a MovieCard for every movie received from the API", async () => {
    //Render component
    render(
      <BrowserRouter>
        <MovieList />
      </BrowserRouter>
    );

    //Wait for asynchronous state updates
    await waitFor(() => {
      //There must be as many cards as movies in the mocked list (2)
      const cards = screen.getAllByTestId("movieCard");
      expect(cards).toHaveLength(2);
    });
  });

  test("Show Loading text if the movies have not been fetched (yet)", async () => {
    //Make the mock API request return an empty array of movies
    server.use(
      http.get("https://ghibliapi.vercel.app/films", () => {
        return HttpResponse.json([]);
      })
    );

    //Render component
    render(
      <BrowserRouter>
        <MovieList />
      </BrowserRouter>
    );

    //"Loading..."  text should be visible
    await waitFor(() => {
      let element = screen.getByText("Loading...");
      expect(element).toBeVisible();
    });
  });
});

describe("MovieList operations", () => {
  const moviesForList = [
    {
      title: "Test movie 1",
      image: "https://placedog.net/500",
      release_date: 2025,
      rt_score: 86,
      id: 1,
    },
    {
      title: "Test movie 2",
      image: "https://placedog.net/500",
      release_date: 2024,
      rt_score: 50,
      id: 2,
    },
  ];

  const moviesForListReversed = [
    {
      title: "Test movie 2",
      image: "https://placedog.net/500",
      release_date: 2024,
      rt_score: 50,
      id: 2,
    },
    {
      title: "Test movie 1",
      image: "https://placedog.net/500",
      release_date: 2025,
      rt_score: 86,
      id: 1,
    },
  ];

  test("Movies can be filtered by title", () => {
    //Get filtered array of movies
    const filteredMovies = movieListOperations.filterByTitle(
      "1",
      moviesForList
    );

    //Check that the array contains a single element with the filtered title
    expect(filteredMovies).toHaveLength(1);
    expect(filteredMovies[0]).toHaveProperty("title", "Test movie 1");
  });

  test("Movies can be sorted by ascending year", () => {
    //Get sorted array of movies
    const filteredMovies = movieListOperations.sortByYear(moviesForList, true);

    //Check that the year in the first element is lower than the year in the second element
    expect(filteredMovies[0].release_date).toBeLessThan(
      filteredMovies[1].release_date
    );
  });

  test("Movies can be sorted by descending year", () => {
    //Get sorted array of movies
    const filteredMovies = movieListOperations.sortByYear(
      moviesForListReversed,
      false
    );

    //Check that the year in the first element is lower than the year in the second element
    expect(filteredMovies[0].release_date).toBeGreaterThan(
      filteredMovies[1].release_date
    );
  });

  test("Movies can be sorted by ascending rating", () => {
    //Get sorted array of movies
    const filteredMovies = movieListOperations.sortByRating(
      moviesForList,
      true
    );

    //Check that the year in the first element is lower than the year in the second element
    expect(filteredMovies[0].rt_score).toBeLessThan(filteredMovies[1].rt_score);
  });

  test("Movies can be sorted by descending rating", () => {
    //Get sorted array of movies
    const filteredMovies = movieListOperations.sortByRating(
      moviesForListReversed,
      false
    );

    //Check that the year in the first element is lower than the year in the second element
    expect(filteredMovies[0].rt_score).toBeGreaterThan(
      filteredMovies[1].rt_score
    );
  });
});
