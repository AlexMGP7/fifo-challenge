import React, { useState, useEffect } from "react";
import Joyride, { CallBackProps, Step, STATUS } from "react-joyride";
import { useLocation } from "react-router-dom";

const Tutorial: React.FC = () => {
  const [run, setRun] = useState(false);
  const location = useLocation();

  const stepsByPage: { [key: string]: Step[] } = {
    "/dashboard": [
      { target: ".stats-section", content: "Aquí puedes ver un resumen de tus productos, unidades y valores totales." },
      { target: ".add-product-button", content: "Usa este botón para agregar un nuevo producto." },
      { target: ".search-bar", content: "Utiliza esta barra para buscar productos en tu inventario." },
      { target: ".table-tuto", content: "Aquí puedes ver la lista de todos tus productos organizados." },
      { target: ".pagination-controls", content: "Navega entre páginas si tienes muchos productos." },
    ],
    "/history": [
      { target: ".history-table", content: "Aquí puedes ver el historial de salidas de productos." },
    ],
    "/add-product": [
      { target: ".product-form", content: "Completa este formulario para agregar un nuevo producto." },
    ],
  };

  const normalizedPath = location.pathname.replace(/\/+$/, "");
  const steps = stepsByPage[normalizedPath] || [];

  useEffect(() => {

    const tutorialCompleted = localStorage.getItem(`tutorialCompleted:${normalizedPath}`);
    if (!tutorialCompleted && steps.length > 0) {
      setRun(true);
    } else {
      setRun(false);
    }
  }, [normalizedPath, steps.length]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type } = data;
    console.log("Joyride Callback Data:", data);

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      console.log("Tutorial completado o saltado.");
      setRun(false);
      localStorage.setItem(`tutorialCompleted:${normalizedPath}`, "true");
    }

    if (type === "step:after") {
      console.log(`Step ${index} completado.`);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={handleJoyrideCallback}
      showSkipButton
      showProgress
      continuous
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#4CAF50",
        },
      }}
    />
  );
};

export default Tutorial;
