import Link from "next/link";
import { MultimediaItem } from "@/ui/Components/Multimedia/MultimediaItem";
import { MultimediaLinks } from "@/data/MultimediaLinks";

const back = (
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
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>
);

export default function Page() {
  return (
    <main className="mx-3">
      <Link
        href={"/acerca"}
        className="bg-black text-white rounded-lg p-2 inline-block active:scale-95 duration-150 transition-transform ease-in-out"
      >
        {back}
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 mt-10">
        {MultimediaLinks.map((item) => (
          <MultimediaItem link={item.src} key={item.key} />
        ))}
      </div>
    </main>
  );
}
