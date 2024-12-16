import React, { createContext } from "react";
import { useUrlHash } from "../lib/hooks/useUrlHash.ts";

type UrlHashContextProviderProps = {
  children: React.ReactNode;
}

type UrlHashContextType = {
  urlHash: string | null;
}

export const UrlHashContext = createContext<UrlHashContextType>({
  urlHash: null
});

export const UrlHashContextProvider = (props: UrlHashContextProviderProps) => {

  const { children } = props;
  const urlHash = useUrlHash();

  return (
    <UrlHashContext.Provider value={ { urlHash }}>
      {children}
    </UrlHashContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUrlHashContext = () => {
  const context = React.useContext(UrlHashContext);
  if (context)
    return context;

  throw new Error('useUrlHashContext must be used within a UrlHashContextProvider');
}
