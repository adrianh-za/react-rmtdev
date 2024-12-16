import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookmarksContextProvider } from "./contexts/bookmarksContextProvider.tsx";
import { UrlHashContextProvider } from "./contexts/urlHashContextProvider.tsx";
import { SearchTermContextProvider } from "./contexts/searchTermContextProvider.tsx";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <UrlHashContextProvider>
          <SearchTermContextProvider>
            <App />
          </SearchTermContextProvider>
        </UrlHashContextProvider>
      </BookmarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
