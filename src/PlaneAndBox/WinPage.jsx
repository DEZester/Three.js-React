import { useEffect } from "react";
import { useLocation, useHref } from "react-router-dom";
const WinPage = () => {
  useEffect(() => {
    document.title = "You are win";
    const el = document.querySelector(".game");
    document.body.removeChild(el);
  }, []);

  return <div>You are win</div>;
};

export default WinPage;
