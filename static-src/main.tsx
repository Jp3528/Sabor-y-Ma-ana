import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import { RestaurantApp } from "../app/components/RestaurantApp";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No se encontró el contenedor principal de la aplicación.");
}

createRoot(root).render(
  <StrictMode>
    <RestaurantApp />
  </StrictMode>,
);
