"use client";

import { useState } from "react";
import { FAQitem } from "@/ui/Components/Home/FAQitem";
import { FaqQuestions } from "@/data/FaqQuestions";

export const Faq = () => {
  const [active, setActive] = useState<number | null>(null);

  function handleToggle(index: number) {
    if (active === index) {
      return setActive(null);
    } else {
      setActive(index);
    }
  }

  return (
    <div>
      <h3 className="text-center text-2xl sm:text-4xl font-bold mb-4">
        Preguntas Frecuentes
      </h3>
      <ul>
        {FaqQuestions.map((question) => (
          <FAQitem
            key={question.id}
            pregunta={question.pregunta}
            respuesta={question.respuesta}
            onClick={handleToggle}
            active={active}
            id={question.id}
          />
        ))}
      </ul>
    </div>
  );
};
