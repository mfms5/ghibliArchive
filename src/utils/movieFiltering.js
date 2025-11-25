export const filterByTitle = (title, allMovies) => {
  return allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(title.toLowerCase())
  );
};
