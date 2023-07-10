import "./style.css";
// import { setupCounter } from "./counter.ts";
import Header from "./header.ts";

document
  .querySelector<HTMLDivElement>(".main")!
  .insertAdjacentHTML("beforebegin", Header("JSFoundations"));

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
