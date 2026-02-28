// CSS Imports
import "./styles/reset.css";
import "./styles/global.css";
// JS Imports
import { App } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");
  new App(root).init();
});
