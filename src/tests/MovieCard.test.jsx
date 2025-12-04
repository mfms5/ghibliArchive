import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import MovieCard from "../components/MovieCard";
import { BrowserRouter } from "react-router-dom";

describe("<MovieCard />", () => {
  const movie = {
    title: "Test movie",
    image: "https://placedog.net/500",
    release_date: 2025,
    rt_score: 86,
    id: 1,
  };

  test("Renders title, year and rating on the card", () => {
    //Render component
    render(
      <BrowserRouter>
        <MovieCard
          title={movie.title}
          posterUrl={movie.image}
          year={movie.release_date}
          rating={movie.rt_score}
          id={movie.id}
        />
      </BrowserRouter>
    );

    //Title, year and rating should be visible
    let element = screen.getByText("Test movie");
    expect(element).toBeVisible();
    element = screen.getByText("2025");
    expect(element).toBeVisible();
    element = screen.getByText("8.6"); //Rating should be properly formatted
    expect(element).toBeVisible();

    //Poster image should have the correct url as its source, and the movie title as its alt
    element = screen.getAllByRole("img")[0];
    expect(element).toHaveAttribute("src", movie.image);
    expect(element).toHaveAttribute("alt", movie.title);
  });

  test("Clicking the card redirects to the movie's info page", async () => {
    //Mock useNavigate
    const { mockUseNavigate } = vi.hoisted(() => {
      return { mockUseNavigate: vi.fn() };
    });

    vi.mock(`react-router-dom`, async () => {
      const actual = await vi.importActual(`react-router-dom`);

      return {
        ...actual,
        useNavigate: () => mockUseNavigate,
      };
    });

    //Render component
    render(
      <BrowserRouter>
        <MovieCard
          title={movie.title}
          posterUrl={movie.image}
          year={movie.release_date}
          rating={movie.rt_score}
          id={movie.id}
        />
      </BrowserRouter>
    );

    const user = userEvent.setup();

    const card = screen.getByTestId("movieCard");
    await user.click(card);

    console.log("calls: ", mockUseNavigate.mock.calls);

    expect(mockUseNavigate).toBeCalledWith("/movies/1");
  });
});
