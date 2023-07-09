import "./style.css";
import viteLogo from "/vite.svg";

const Header = (name: string): string => {
  return `
    <header class="header">
      <img src="${viteLogo}" class="header__logo" alt="Vite Logo" />
      <h1>${name}</h1>
      <nav class="header__nav">
        <ul class="header__list">
          <li class="header__list-item"><a href="/">Home</a></li>
          <li class="header__list-item"><a href="/game/">RPS:Game</a></li>
          <li class="header__list-item"><a href="/book/">OOP:Book</a></li>
        </ul>
      </nav>
    </header>
  `;
};

export default Header;
// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
