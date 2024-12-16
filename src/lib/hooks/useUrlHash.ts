import { useEffect, useState } from "react";

export const useUrlHash = () => {
  const [urlHash, setUrlHash] = useState<string | null>(null);

  const handleHashChange = () => {
    const hash = window.location.hash.slice(1);
    setUrlHash(hash || null);
  };

  useEffect(() => {

    // Initial url hash check
    handleHashChange();

    // Handle the url hash change event
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return urlHash;
}