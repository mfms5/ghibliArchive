import { render, screen, within, waitFor } from "@testing-library/react";
import Sort from "../components/Sort";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { BrowserRouter } from "react-router-dom";
import MovieList from "../components/MovieList";

describe("<Sort />", () => {
  beforeEach(async () => {
    const movieListRef = createRef();

    // Render MovieList to avoid reference errors
    render(
      <BrowserRouter>
        <MovieList ref={movieListRef} />
      </BrowserRouter>
    );

    await render(<Sort movieListRef={movieListRef} />);
  });

  test("Dropdown menu is closed initially with a default order of Year Ascendent", () => {
    // "Year ↑" should be visible
    let element = screen.getByText("Year ↑");
    expect(element).toBeVisible();

    // Dropdown list should not exist in the document
    element = screen.queryByTestId("dropdownList");
    expect(element).not.toBeInTheDocument();
  });

  test("User can click the Sort by button to open the dropdown menu", async () => {
    // Simulate button click to open the menu
    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    // Dropwdonw list should now exist in the document
    const dropdown = screen.queryByTestId("dropdownList");
    expect(dropdown).toBeVisible();
  });

  test("After the user clicks an element in the dropdwon menu, the menu will collapse and the Sort button will show the selected sorting method", async () => {
    // Simulate button click to open the menu
    const user = userEvent.setup();
    let button = screen.getByRole("button");
    await user.click(button);

    // Simulate clicking on a sorting method
    button = screen.getByText("Rating ↑");
    await user.click(button);

    // Dropwdown list should be closed
    let element = screen.queryByTestId("dropdownList");
    expect(element).not.toBeInTheDocument();

    // Sort button should now show the selected sorting method
    element = screen.getByText("Rating ↑");
    expect(element).toBeVisible();
  });

  // API call mocked with MSW
  test("After the user selects a different sorting method, the movies are sorted accordingly", async () => {
    // Simulate button click to open the menu
    const user = userEvent.setup();
    let button = screen.getByRole("button");
    await user.click(button);

    // Simulate clicking on a sorting method
    button = screen.getByText("Rating ↑");
    await user.click(button);

    // Obtain all movie cards
    await waitFor(() => {
      // The first card must have a lower rating than the second
      const cards = screen.getAllByTestId("rating");
      expect(within(cards[0]).getByText("5")).toBeTruthy();
      expect(within(cards[1]).getByText("8.6")).toBeTruthy();
    });
  });
});
