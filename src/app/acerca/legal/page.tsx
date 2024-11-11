import Link from "next/link";
import { legalData } from "@/data/LegalData";

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>
);

export default function Page() {
  return (
    <main className="mx-2 flex flex-col">
      <header className="flex items-center mb-4">
        <Link
          href="/acerca"
          className="bg-black text-white rounded-lg p-2 inline-flex items-center transition-transform duration-150 ease-in-out active:scale-95"
        >
          <BackIcon />
        </Link>
        <h1 className="text-2xl font-bold ml-4">Términos y Condiciones</h1>
      </header>
      <div className="bg-gradient-to-b from-white/80 via-gray-100/80 to-gray-200 p-8 shadow-lg rounded-lg flex flex-col gap-8">
        {legalData.map((section, index) => (
          <section
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm transition-transform duration-200 hover:scale-105"
          >
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              {section.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
