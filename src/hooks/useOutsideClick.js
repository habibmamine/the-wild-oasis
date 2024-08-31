import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  const el = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (el.current && !el.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () => document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return el;
}
