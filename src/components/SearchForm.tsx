import React from "react";
import { useSearchTermContext } from "../contexts/searchTermContextProvider.tsx";

const SearchForm = () => {

  const { term, setTerm } = useSearchTermContext();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  }

  return (
    <form
      onSubmit={e => e.preventDefault()}
      action="#"
      className="search">

      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={term}
        onChange={handleSearchInputChange}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}

export default SearchForm;
