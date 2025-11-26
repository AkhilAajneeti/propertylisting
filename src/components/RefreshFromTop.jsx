import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// assuming you attached lenis instance to window in your global setup
const RefreshFromTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default RefreshFromTop;
