/**
 * Collection of filtering and sorting operations done on the movie array.
 * Called mainly by the MovieList component.
 */

// Search
export const filterByTitle = (title, allMovies) => {
  return allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(title.toLowerCase())
  );
};

// Sorting
export const sortByRating = (allMovies, ascendent) => {
  const order = ascendent ? 1 : -1;
  //Slice to create new array
  return allMovies.slice().sort((a, b) => (a.rt_score - b.rt_score) * order);
};

export const sortByYear = (allMovies, ascendent) => {
  const order = ascendent ? 1 : -1;
  //Slice to create new array
  return allMovies
    .slice()
    .sort((a, b) => (a.release_date - b.release_date) * order);
};
