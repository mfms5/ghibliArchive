/**
 * Custom dropdown menu component for the movie list, to sort movies by
 * year (ascendant or descendant) or rating (ascendant or descendant).
 * The sorting method selected by the user is sent to the MovieList component
 * through the reference received by props.
 */

import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Sort = ({ movieListRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortingTypeLabel, setSortingTypeLabel] = useState("Year ↑");

  // The name will be displayed as the selected method in the dropdown menu.
  // The value is sent to MovieList.
  const types = [
    { name: "Year ↑", value: "yearAsc" },
    { name: "Year ↓", value: "yearDes" },
    { name: "Rating ↑", value: "ratingAsc" },
    { name: "Rating ↓", value: "ratingDes" },
  ];

  /**
   * After the user selects a sorting method from the dropdown menu,
   * the value is sent to MovieList through its reference, and the menu is closed.
   */
  const onChangeSortType = (type, name) => {
    setSortingTypeLabel(name);
    movieListRef.current.setSortingType(type);
    setIsOpen(false);
  };

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Allow for closing the dropdown by clicking outside
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
          <div className="dropdown-list" data-testid="dropdownList">
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
  );
};

export default Sort;
