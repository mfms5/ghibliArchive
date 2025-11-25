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
      <div>
        <img src="search.png" alt="search" className="left-2" />
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {/*<img src="clear.png" alt="clear" className="right-2" />*/}
        <span className="clearButton" onClick={() => clearSearch()}>
          X
        </span>
      </div>
    </div>
  );
};

export default Search;
