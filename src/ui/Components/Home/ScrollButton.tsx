import { ScrollButtonType } from "@/types/ScrollButtonType";

const right = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 sm:w-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
    />
  </svg>
);

const left = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 sm:w-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
    />
  </svg>
);

export const ScrollButton: React.FC<ScrollButtonType> = ({
  direction,
  onClick,
  ariaLabel,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`scroll-button ${direction} border-2 rounded-full border-gray-secondary p-2 active:bg-gray-secondary active:text-white`}
    >
      {direction === "left" ? left : right}
    </button>
  );
};
