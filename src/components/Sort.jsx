import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Sort = ({ movieListRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortingTypeValue, setSortingTypeValue] = useState("yearAsc");
  const [sortingTypeLabel, setSortingTypeLabel] = useState("Year ↑");

  const types = [
    { name: "Year ↑", value: "yearAsc" },
    { name: "Year ↓", value: "yearDes" },
    { name: "Rating ↑", value: "ratingAsc" },
    { name: "Rating ↓", value: "ratingDes" },
  ];

  const onChangeSortType = (type, name) => {
    setSortingTypeValue(type);
    setSortingTypeLabel(name);
    movieListRef.current.setSortingType(type);
    setIsOpen(false);
  };

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  //Allow for closing the dropdown by clicking outside
  useEffect(() => {
    setTimeout(() => {
      if (isOpen) {
        window.addEventListener("click", close);
      } else {
        window.removeEventListener("click", close);
      }
    }, 0);
  }, [isOpen]);

  return (
    <div className="dropdown-wrapper">
      <span className="h3 text-primary font-semibold text-xl">Sort by: </span>
      <div>
        <button
          type="button"
          className="dropdown-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="dropdown-header-title">{sortingTypeLabel}</div>
          {isOpen ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} />
          )}
        </button>
        {isOpen && (
          <div className="dropdown-list">
            {types.map((type) => (
              <button
                type="button"
                className="dropdown-item"
                key={type.value}
                onClick={() => onChangeSortType(type.value, type.name)}
              >
                {type.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>

    /*<label>
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
    </label>*/
  );
};

export default Sort;
