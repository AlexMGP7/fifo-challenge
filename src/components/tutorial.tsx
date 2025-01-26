// src/components/Tutorial.tsx
import React, { useState, useEffect } from "react";
import Joyride, { CallBackProps, Step, STATUS, ACTIONS, EVENTS } from "react-joyride";
import { useLocation } from "react-router-dom";

const Tutorial: React.FC = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const location = useLocation();

  const stepsByPage: { [key: string]: Step[] } = {
    "/dashboard": [
      { target: ".stats-section", content: "Aquí puedes ver un resumen de tus productos, unidades y valores totales." },
      { target: ".add-product-button", content: "Usa este botón para agregar un nuevo producto." },
      { target: ".search-bar", content: "Utiliza esta barra para buscar productos en tu inventario." },
      { target: ".tables", content: "Aquí puedes ver la lista de todos tus productos organizados." },
      { target: ".pagination-controls", content: "Navega entre páginas si tienes muchos productos." },
    ],
    "/history": [
      { target: ".history-table", content: "Aquí puedes ver el historial de salidas de productos." },
    ],
    "/add-product": [
      { target: ".product-form", content: "Completa este formulario para agregar un nuevo producto." },
    ],
  };

  // Normaliza el path para evitar discrepancias con barras finales
  const normalizedPath = location.pathname.replace(/\/+$/, "");

  // Obtiene los pasos correspondientes a la ruta actual
  const steps = stepsByPage[normalizedPath] || [];

  useEffect(() => {
    const tutorialCompleted = localStorage.getItem(`tutorialCompleted:${normalizedPath}`);
    if (!tutorialCompleted && steps.length > 0) {
      setRun(true);
      setStepIndex(0); // Reinicia el índice al iniciar el tutorial
    }
  }, [normalizedPath, steps.length]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, index, type } = data;

    // Maneja la finalización o salto del tutorial
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      localStorage.setItem(`tutorialCompleted:${normalizedPath}`, "true");
    }
    // Maneja la navegación entre pasos
    else if (type === EVENTS.STEP_AFTER) {
      if (action === ACTIONS.NEXT && typeof index === 'number') {
        setStepIndex(index + 1);
      } else if (action === ACTIONS.PREV && typeof index === 'number') {
        setStepIndex(index - 1);
      }
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
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
