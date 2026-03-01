import logo from "../assets/images/logo.svg";
import icons from "../assets/images/icons/icons.js";
export class WeatherApp {
  constructor(root) {
    this.root = root;
  }

  render() {
    this.root.innerHTML = `
    <main class="main__wrapper">
      
      <header class="header__wrapper">
        <div class="header__container">
          <div class="header__logo">
            <img 
            src="${logo}" 
            alt="logo"/>
          </div>

          <div class="units__container">
            <button class="units__button">
              <img src="${icons.iconUnits}" alt="units icon"/>
              <p class="units__text">Units</p>
              <svg 
              width="14" 
              height="11" 
              fill="none" 
              viewBox="0 0 14 11">
              <path fill="#fff" d="M11.895 1.047c.136-.137.355-.137.464 0l.793.766c.11.136.11.355 0 .464L4.95 10.48a.315.315 0 0 1-.465 0L.82 6.844c-.11-.137-.11-.356 0-.465l.793-.793c.11-.11.328-.11.465 0l2.625 2.652 7.192-7.191Z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

    </main>
    `;
  }
}
