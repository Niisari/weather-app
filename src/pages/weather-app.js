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
              <img 
              src="${icons.iconUnits}" 
              alt="units icon"
              width="14"
              height="auto"
              class="units__wheel"/>
              <p class="units__text">Units</p>
              <svg 
              width="10" 
              height="auto" 
              fill="none" 
              viewBox="0 0 13 8">
              <path 
              fill="#fff" 
              d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section class="main__section">
        <div class="main__container">

          <div class="search__container">
            <h1 class="search__title">How's the sky looking today?</h1>

            <div class="search__form">
              <input 
              type="text" 
              class="search__input"
              placeholder="Search for a city..."/>
                <img 
                src="${icons.iconSearch}" 
                alt="search icon"
                class="search__icon"
                width="19"
                height="auto"/>
                <button class="search__button">
                  Search
                </button>
            </div>
          </div>

          <div class="main__content--grid">
          <section class="info__container">
            <div class="info__card">
              <div class="info__card--top">
                <h2 class="info__card--title">Prague, Czechia</h2>
                <span class="info__card--date">Tuesday, Aug 5, 2025</span>
              </div>
              <div class="info__card--bottom">
                <span class="info__card--icon">
                <img 
                src="${icons.iconSunny}" 
                alt="sunny icon"
                width="120"
                height="auto"/>
                </span>
                <span class="info__card--temp">20°</span>
              </div>
            </div>
          </section>

          <section class="forecast__details--grid">
            <div class="forecast__details--card">
              <h3 class="forecast__details--title">Feels Like</h3>
              <span class="forecast__details--feels forecast__details--text">18°</span>
            </div>

            <div class="forecast__details--card">
              <h3 class="forecast__details--title">Humidity</h3>
              <span class="forecast__details--humidity forecast__details--text">46%</span>
            </div>

            <div class="forecast__details--card">
              <h3 class="forecast__details--title">Wind</h3>
              <span class="forecast__details--wind forecast__details--text">7 km/h</span>
            </div>

            <div class="forecast__details--card">
              <h3 class="forecast__details--title">Precipitation</h3>
              <span class="forecast__details--precipitation forecast__details--text">0 mm</span>
            </div>
          </section>

          <section class="daily__forecast--section">
            <h2 class="daily__forecast--title02">Daily Forecast</h2>
            <div class="daily__forecast--grid">
              <div class="daily__forecast--card">
                <h3 class="daily__forecast--title">Mon</h3>
                <span class="daily__forecast--icon">
                  <img 
                  src="${icons.iconSunny}" 
                  alt="sunny icon"
                  width="80"
                  height="auto"/>
                </span>
                  <div class="daily__forecast--bottom">
                    <span class="daily__forecast--temp">20°</span><span class="daily__forecast--feels">18°</span>
                  </div>
              </div>

              <div class="daily__forecast--card">
                <h3 class="daily__forecast--title">Tue</h3>
                <span class="daily__forecast--icon">
                  <img 
                  src="${icons.iconRain}" 
                  alt="sunny icon"
                  width="80"
                  height="auto"/>
                </span>
                  <div class="daily__forecast--bottom">
                    <span class="daily__forecast--temp">20°</span><span class="daily__forecast--feels">18°</span>
                  </div>
              </div>

              <div class="daily__forecast--card">
                <h3 class="daily__forecast--title">Wed</h3>
                <span class="daily__forecast--icon">
                  <img 
                  src="${icons.iconSnow}" 
                  alt="sunny icon"
                  width="80"
                  height="auto"/>
                </span>
                  <div class="daily__forecast--bottom">
                    <span class="daily__forecast--temp">20°</span><span class="daily__forecast--feels">18°</span>
                  </div>
              </div>

              <div class="daily__forecast--card">
                <h3 class="daily__forecast--title">Thu</h3>
                <span class="daily__forecast--icon">
                  <img 
                  src="${icons.iconStorm}" 
                  alt="sunny icon"
                  width="80"
                  height="auto"/>
                </span>
                  <div class="daily__forecast--bottom">
                    <span class="daily__forecast--temp">20°</span><span class="daily__forecast--feels">18°</span>
                  </div>
              </div>

              <div class="daily__forecast--card">
                <h3 class="daily__forecast--title">Fri</h3>
                <span class="daily__forecast--icon">
                  <img 
                  src="${icons.iconPartlyCloudy}" 
                  alt="sunny icon"
                  width="80"
                  height="auto"/>
                </span>
                  <div class="daily__forecast--bottom">
                    <span class="daily__forecast--temp">20°</span><span class="daily__forecast--feels">18°</span>
                  </div>
              </div>

              <div class="daily__forecast--card">
                <h3 class="daily__forecast--title">Sat</h3>
                <span class="daily__forecast--icon">
                  <img 
                  src="${icons.iconOvercast}" 
                  alt="sunny icon"
                  width="80"
                  height="auto"/>
                </span>
                  <div class="daily__forecast--bottom">
                    <span class="daily__forecast--temp">20°</span><span class="daily__forecast--feels">18°</span>
                  </div>
              </div>

              <div class="daily__forecast--card">
                <h3 class="daily__forecast--title">Sun</h3>
                <span class="daily__forecast--icon">
                  <img 
                  src="${icons.iconDrizzle}" 
                  alt="sunny icon"
                  width="80"
                  height="auto"/>
                </span>
                  <div class="daily__forecast--bottom">
                    <span class="daily__forecast--temp">20°</span><span class="daily__forecast--feels">18°</span>
                  </div>
              </div>
            </div>
          </section>

          <section class="hourly__forecast--section">
            <div class="hourly__forecast--top">
              <h2 class="hourly__forecast--title">Hourly Forecast</h2>
              <button class="hourly__forecast--btn">
              Tuesday
                <svg 
                width="10" 
                height="auto" 
                fill="none" 
                viewBox="0 0 13 8">
                <path 
                fill="#fff" 
                d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"/>
                </svg>              
              </button>
            </div>

            <div class="hourly__forecast--flex">

              <div class="hourly__forecast--card">
                <div class="hourly__forecast--time">
                  <img src="${icons.iconSunny}" alt="sunny icon"/>
                  <span>3 PM</span>
                </div>
                <div class="hourly__forecast--temp">
                  <span>20°</span>
                </div>
              </div>

              <div class="hourly__forecast--card">
                <div class="hourly__forecast--time">
                  <img src="${icons.iconStorm}" alt="sunny icon"/>
                  <span>4 PM</span>
                </div>
                <div class="hourly__forecast--temp">
                  <span>20°</span>
                </div>
              </div>

              <div class="hourly__forecast--card">
                <div class="hourly__forecast--time">
                  <img src="${icons.iconSnow}" alt="sunny icon"/>
                  <span>5 PM</span>
                </div>
                <div class="hourly__forecast--temp">
                  <span>20°</span>
                </div>
              </div>

              <div class="hourly__forecast--card">
                <div class="hourly__forecast--time">
                  <img src="${icons.iconPartlyCloudy}" alt="sunny icon"/>
                  <span>6 PM</span>
                </div>
                <div class="hourly__forecast--temp">
                  <span>20°</span>
                </div>
              </div>

              <div class="hourly__forecast--card">
                <div class="hourly__forecast--time">
                  <img src="${icons.iconRain}" alt="sunny icon"/>
                  <span>7 PM</span>
                </div>
                <div class="hourly__forecast--temp">
                  <span>20°</span>
                </div>
              </div>

              <div class="hourly__forecast--card">
                <div class="hourly__forecast--time">
                  <img src="${icons.iconOvercast}" alt="sunny icon"/>
                  <span>8 PM</span>
                </div>
                <div class="hourly__forecast--temp">
                  <span>20°</span>
                </div>
              </div>

              <div class="hourly__forecast--card">
                <div class="hourly__forecast--time">
                  <img src="${icons.iconOvercast}" alt="sunny icon"/>
                  <span>9 PM</span>
                </div>
                <div class="hourly__forecast--temp">
                  <span>20°</span>
                </div>
              </div>

              <div class="hourly__forecast--card">
                <div class="hourly__forecast--time">
                  <img src="${icons.iconDrizzle}" alt="sunny icon"/>
                  <span>10 PM</span>
                </div>
                <div class="hourly__forecast--temp">
                  <span>20°</span>
                </div>
              </div>

            </div>
          </section>
          </div>

        </div>
      </section>
    </main>
    `;
  }
}
