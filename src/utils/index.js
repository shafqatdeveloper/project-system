import { useEffect, useState } from "react";

/**hook that gives true if the window screen is smaller than breakPoint and vice versa */
export const useScreenWidth = (breakPoint) => {
  const [isSmaller, setisSmaller] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= breakPoint) {
      setisSmaller(true);
    }
    const adjuster = () => {
      if (window.innerWidth <= breakPoint) {
        setisSmaller(true);
      } else setisSmaller(false);
    };
    window.addEventListener("resize", adjuster);
    return () => {
      window.removeEventListener("resize", adjuster);
    };
  }, [window.innerWidth]);

  return { isSmaller };
};
