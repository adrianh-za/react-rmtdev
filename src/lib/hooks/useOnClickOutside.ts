import React, { useEffect } from "react";

export const useOnClickOutside = (
  ignoreRefs: React.RefObject<HTMLElement>[],
  handler: () => void
) => {

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && ignoreRefs.every(ref => !ref.current?.contains(event.target as Node))) {
        handler();
      }
    }

    document.addEventListener("click", handleClick);

    return () =>  document.removeEventListener("click", handleClick);
  }, [ignoreRefs, handler]);
}