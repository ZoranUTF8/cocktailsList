import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = useRef(""); //!hold the value of the input

  //! functions
  //? set up focus on initial render
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  //!pass the typed in value to search term, that than render the fetch  in context.js
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };

  const handleSubmit = (evt) => {
    //? prevent refreshing on enter
    evt.preventDefault();
  };
  //! main return
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Search cocktails</label>
          <input
            type="text"
            name="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
