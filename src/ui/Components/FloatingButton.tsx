"use client";
import { useEffect, useState } from "react";

const up = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3"
    />
  </svg>
);

export const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed z-50 bottom-4 right-4 p-3 bg-green-secondary text-white rounded-full hover:bg-green-primary transition-colors duration-200 ease-in-out"
      >
        {up}
      </button>
    )
  );
};
