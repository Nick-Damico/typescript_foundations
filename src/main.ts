import "./style.css";
// import { setupCounter } from "./counter.ts";
import Header from "./header.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
    ${Header("JSFoundations")}
  </main>
`;

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
