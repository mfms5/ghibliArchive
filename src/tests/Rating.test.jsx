import { render, screen } from "@testing-library/react";
import Rating from "../components/Rating";

describe("<Rating />", () => {
  describe("Rating should be formatted to be a number between 0 and 10 with a single decimal", () => {
    test("Rating of 0 is rendered as 0", () => {
      // Render component
      render(<Rating rating={0} />);

      let element = screen.getByText("0");
      expect(element).toBeVisible();
    });

    test("Rating of 10 is rendered as 1", () => {
      // Render component
      render(<Rating rating={10} />);

      let element = screen.getByText("1");
      expect(element).toBeVisible();
    });

    test("Rating of 100 is rendered as 10", () => {
      // Render component
      render(<Rating rating={100} />);

      let element = screen.getByText("10");
      expect(element).toBeVisible();
    });

    test("Rating of 50 is rendered as 5", () => {
      //Render component
      render(<Rating rating={50} />);

      let element = screen.getByText("5");
      expect(element).toBeVisible();
    });

    test("Rating of 86 is rendered as 8.6", () => {
      //Render component
      render(<Rating rating={86} />);

      let element = screen.getByText("8.6");
      expect(element).toBeVisible();
    });
  });
});
