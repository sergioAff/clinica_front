"use client";

import { useRef, useEffect, useState } from "react";
import { ContactCardType } from "@/types/ContactCard";
import { LinksFooter } from "../../Components/LinksFooter";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function ContactCard({ via, icon, direccion, enlace }: ContactCardType) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(enlace);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
    } catch (err) {
      console.error("Error al copiar el enlace: ", err);
    }
  };

  return (
    <motion.div
      className="group p-10 md:px-2 flex gap-10"
      id="cards"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        ref={cardRef}
        className="min-w-[60dvw] min-h-[45dvh] md:min-w-[50dvw] md:min-h-[30dvh] lg:min-w-[25dvw] relative transition-all duration-300 ease-in-out transform card rounded-xl shadow-lg shadow-gray-primary overflow-hidden"
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-85 rounded-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(0,255,0,0.15),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
        <div className="absolute inset-0 flex justify-between py-5 items-center flex-col gap-5 px-5 z-10">
          <motion.div className="rounded-full w-2/4 h-1/4 flex py-2 items-center justify-center bg-white-primary">
            <LinksFooter nombre={icon} estilos="" />
          </motion.div>
          <div className="w-full h-2/3 flex justify-between flex-col items-center">
            <motion.h2
              className="text-white tracking-wider text-2xl pt-7 md:text-3xl font-semibold"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {via.replace(": ", " ")}
            </motion.h2>
            <div className="w-full flex gap-2">
              <motion.button
                className="py-3 cursor-pointer w-1/2 flex items-center justify-center bg-white bg-opacity-10 border border-opacity-20 text-white z-30 hover:bg-white hover:bg-opacity-30 transition-colors duration-300 ease-in-out rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
              >
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
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-1/2"
              >
                <Link
                  target="_blank"
                  href={direccion}
                  className="py-3 cursor-pointer flex items-center justify-center bg-white bg-opacity-10 border border-opacity-20 text-white z-30 hover:bg-white hover:bg-opacity-30 transition-colors duration-300 ease-in-out rounded-lg text-center"
                >
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
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-1/2 z-50 bg-green-500 text-white p-2 rounded-md shadow-lg"
          >
            {via.replace(": ", "")} copiado al portapapeles
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
