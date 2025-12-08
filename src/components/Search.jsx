/**
 * Search bar component for the movie list, to search movies by title.
 * Includes a controlled input textbox and a button to clear its content.
 * The text typed by the user is debounce for 500ms before it is sent
 * to the MovieList component through the reference received by props.
 */

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

const Search = ({ movieListRef }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  useEffect(() => {
    movieListRef.current.filterSearch(debouncedSearch);
  }, [debouncedSearch]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="search">
      <div className="flex relative items-center">
        <img
          src="search.png"
          alt="search"
          className="absolute left-2 h-5 w-5"
        />
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <span
          className="clearButton"
          data-testid="clearButton"
          onClick={() => clearSearch()}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default Search;
