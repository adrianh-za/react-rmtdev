import React, { createContext } from "react";
import { useDebounce } from "../lib/hooks/useDebounce.ts";

type SearchTermContextProviderProps = {
  children: React.ReactNode;
}

type SearchTermContextType = {
  term: string,
  setTerm: (term: string) => void,
  debouncedTerm: string
};

export const SearchTermContext = createContext<SearchTermContextType>({
  term: "",
  setTerm: () => { },
  debouncedTerm: ""
});

export const SearchTermContextProvider = (props: SearchTermContextProviderProps) => {

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const searchTermDebounced = useDebounce(searchTerm, 800);

  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term);
  }

  return (
    <SearchTermContext.Provider value={{
      term: searchTerm,
      debouncedTerm: searchTermDebounced,
      setTerm: handleSetSearchTerm
    }}>
      {props.children}
    </SearchTermContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchTermContext = () => {
  const context = React.useContext(SearchTermContext);
  if (context)
    return context;

  throw new Error('useSearchTermContext must be used within a SearchTermContextProvider');
}