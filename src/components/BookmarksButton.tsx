import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover.tsx";
import { useRef, useState } from "react";
import { useOnClickOutside } from "../lib/hooks/useOnClickOutside.ts";

const BookmarksButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  //USe custom hook to close the popover
  useOnClickOutside([buttonRef, popoverRef], () => setIsPopupOpen(false));

  //Use classes to close the popover
  // useEffect(() => {
  //   const closePopup = (event: MouseEvent) => {
  //     if (event.target instanceof HTMLElement &&
  //        !event.target.closest(".bookmarks-btn") &&
  //        !event.target.closest(".bookmarks-popover")) {
  //       setIsPopupOpen(false);
  //     }
  //   }

  // //Use refs to close the popover
  // useEffect(() => {
  //   const closePopup = (event: MouseEvent) => {
  //     if (event.target instanceof HTMLElement &&
  //        !buttonRef.current?.contains(event.target) &&
  //        !popoverRef.current?.contains(event.target) ){
  //       setIsPopupOpen(false);
  //     }
  //   }
  //
  //   document.addEventListener("click", closePopup);
  //
  //   return () =>  document.removeEventListener("click", closePopup);
  // }, []);

  return (
    <section>
      <button
        ref={buttonRef}
        className="bookmarks-btn"
        onClick={() => setIsPopupOpen(prev => !prev)}>
        Bookmarks <TriangleDownIcon />
      </button>
      {isPopupOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}

export default BookmarksButton;