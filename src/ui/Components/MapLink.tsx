import Link from "next/link";

export const direccion = "1600 Amphitheatre Parkway, Mountain View, CA";

export const direccionUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  direccion
)}`;

export const MapLink = () => {
  return (
    <address className=" underline underline-offset-2 flex items-center justify-center">
      <Link target="_blank" href={direccionUrl}>
        {direccion}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 inline-block ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </Link>
    </address>
  );
};
