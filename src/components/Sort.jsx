import { useState } from "react";

const Sort = ({ movieListRef }) => {
  const [sortingType, setSortingType] = useState("yearAsc");

  const onChangeSortType = (type) => {
    setSortingType(type);
    movieListRef.current.setSortingType(type);
  };

  return (
    <label>
      Sort by:
      <select
        name="sortingType"
        value={sortingType}
        onChange={(event) => onChangeSortType(event.target.value)}
      >
        <option value="yearAsc">Year ↑</option>
        <option value="yearDes">Year ↓</option>
        <option value="ratingAsc">Rating ↑</option>
        <option value="ratingDes">Rating ↓</option>
      </select>
    </label>
  );
};

export default Sort;
