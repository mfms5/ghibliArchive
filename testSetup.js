import { afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

//Ghibli API requests mocking
const movieInfoFull = {
  title: "Test movie",
  image: "Test image url",
  release_date: 2025,
  rt_score: 86,
  id: 1,
  running_time: 90,
  description: "Test description",
  original_title: "Test original title",
  original_title_romanised: "Test romanized title",
  director: "Test director",
  producer: "Test producer",
};

const moviesForList = [
  {
    title: "Test movie",
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

export const handlers = [
  http.get("https://ghibliapi.vercel.app/films/1", () => {
    return HttpResponse.json(movieInfoFull);
  }),
  http.get("https://ghibliapi.vercel.app/films", () => {
    return HttpResponse.json(moviesForList);
  }),
];

export const server = setupServer(...handlers);

//Start server before all tests
//An error is thrown for requests that don0t have a corresponding handler
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//Close server after all tests
afterAll(() => server.close());

afterEach(() => {
  cleanup();
  //Reset handlers after each test for isolation
  server.resetHandlers();
});
