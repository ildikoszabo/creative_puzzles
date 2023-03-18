import React, { useEffect, useState } from "react";

export default function InfinityScroll(props) {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    let getScrollPercentage = () => {
      // The scrollTop gives length of window that has been scrolled
      const scrolled = document.documentElement.scrollTop;
      // scrollHeight gives total length of the window and
      // The clientHeight gives the length of viewport
      const scrollLength =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = (100 * scrolled) / scrollLength;

      if (scrollPercentage > props.threshold) {
        props.loadNewValues();
      }
      setScrollPercentage(scrollPercentage);
    };

    // Adding event listener on mounting
    window.addEventListener("scroll", getScrollPercentage);

    // Removing event listener upon unmounting
    return () => window.removeEventListener("scroll", getScrollPercentage);
  });

  return <div>{props.children}</div>;
}
