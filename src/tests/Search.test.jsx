import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { beforeEach } from "vitest";

describe("<MovieList />", () => {
  beforeEach(async () => {
    //Mock movie list reference
    const movieListRef = createRef();

    //Render component
    render(
      <BrowserRouter>
        <MovieList ref={movieListRef} />
      </BrowserRouter>
    );

    await render(<Search movieListRef={movieListRef} />);
  });

  //API call mocked with MSW
  test("Receives user input and filters movies by title based on the search terms", async () => {
    // Mock user input to simulate search
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "2");

    // Wait for asynchronous state updates
    await waitFor(() => {
      // There must be a single card with the title "Test movie 2"
      const cards = screen.getAllByTestId("movieCard");
      expect(cards).toHaveLength(1);
      expect(screen.getByText("Test movie 2")).toBeInTheDocument();
    });
  });

  // API call mocked with MSW
  test("User input can be cleared to reset the movie list", async () => {
    // Mock user input to simulate search
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "2");

    // Mock user input to clear search
    const clearButton = screen.getByTestId("clearButton");
    await user.click(clearButton);

    // Wait for asynchronous state updates
    await waitFor(() => {
      // There must be two movie cards
      const cards = screen.getAllByTestId("movieCard");
      expect(cards).toHaveLength(2);

      // Input text should be empty
      expect(input).toHaveProperty("value", "");
    });
  });
});
