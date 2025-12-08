import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import MovieInfo from "../components/MovieInfo";

describe("<MovieCard />", () => {
  // API call mocked with MSW
  test("Renders movie information obtained from API call", async () => {
    // Mock useParams to obtain the movie id
    vi.mock("react-router-dom", () => ({
      useParams: () => ({ id: "1" }),
    }));

    // Render component
    render(<MovieInfo />);

    // Wait for asynchronous state updates
    await waitFor(() => {
      // Title, year, running time, rating, description, director, producer and original title should be visible
      let element = screen.getByText("Test movie");
      expect(element).toBeVisible();
      element = screen.getByText("2025");
      expect(element).toBeVisible();
      element = screen.getByText("1h 30min");
      expect(element).toBeVisible();
      element = screen.getByText("8.6"); //Rating should be properly formatted
      expect(element).toBeVisible();
      element = screen.getByText("Test description");
      expect(element).toBeVisible();
      element = screen.getByText("Test director");
      expect(element).toBeVisible();
      element = screen.getByText("Test producer");
      expect(element).toBeVisible();
      element = screen.getByText("Test original title (Test romanized title)");
      expect(element).toBeVisible();

      //Poster image should have the correct url as its source, and the movie title as its alt
      element = screen.getAllByRole("img")[1];
      expect(element).toHaveAttribute("src", "Test image url");
      expect(element).toHaveAttribute("alt", "Test movie");
    });
  });

  test("Show Loading text if the movie has not been fetched yet", () => {
    // Render component
    render(<MovieInfo />);

    // "Loading..."  text should be visible
    let element = screen.getByText("Loading...");
    expect(element).toBeVisible();

    // Other elements, like Overview or Info, must not appear
    element = screen.queryByText("Overview");
    expect(element).not.toBeInTheDocument();
    element = screen.queryByText("Info");
    expect(element).not.toBeInTheDocument();
  });
});
