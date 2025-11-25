import Header from "./Header";
import MovieList from "./MovieList";
import Search from "./Search";
import { useRef } from "react";

const Home = () => {
  const movieListRef = useRef();

  return (
    <>
      <div className="pattern" />
      <Header />
      <div className="wrapper">
        <section>
          <h2 className="my-3">Movies</h2>
          <Search movieListRef={movieListRef} />
          <MovieList ref={movieListRef} />
        </section>
      </div>
    </>
  );
};

export default Home;
