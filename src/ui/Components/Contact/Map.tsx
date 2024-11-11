"use client";

import { useState } from "react";

export const Map = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <iframe
        onLoad={handleLoad}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1068128.1073749976!2d-56.62689820526496!3d-34.77162445624078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f804100ba2d01%3A0xf372c74a28f7ab96!2sC.%20Tom%C3%A1s%20Muniz%201926%2C%2011800%20Montevideo%2C%20Departamento%20de%20Montevideo%2C%20Uruguay!5e0!3m2!1ses!2sus!4v1722972072985!5m2!1ses!2sus"
        width="600"
        height="450"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full shadow-md border-2 border-black shadow-gray-secondary rounded-lg"
        title="Mapa de ubicación"
        aria-label="Mapa de ubicación"
        aria-hidden="false"
        aria-describedby="Mapa de ubicación"
        aria-labelledby="Mapa de ubicación"
        aria-controls="Mapa de ubicación"
      ></iframe>
    </div>
  );
};
