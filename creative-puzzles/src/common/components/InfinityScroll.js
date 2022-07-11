import React, { useEffect, useState } from "react";

export default function InfinityScroll(props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let computeProgress = () => {
      // The scrollTop gives length of window that has been scrolled
      const scrolled = document.documentElement.scrollTop;
      // scrollHeight gives total length of the window and
      // The clientHeight gives the length of viewport
      const scrollLength =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = `${(100 * scrolled) / scrollLength}`;

      if (progress > props.treshold) {
        // add more values to the list
        props.loadNewValues();
      }
      setProgress(progress);
    };

    // Adding event listener on mounting
    window.addEventListener("scroll", computeProgress);

    // Removing event listener upon unmounting
    return () => window.removeEventListener("scroll", computeProgress);
  });

  return <div>{props.children}</div>;
}
