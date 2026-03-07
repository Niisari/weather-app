import logo from "../assets/images/logo.svg";
import icons from "../assets/images/icons/icons.js";
import { UnitsMenu } from "../components/UnitsMenu.js";
import { HourlyMenu } from "../components/HourlyMenu.js";
import { Loader } from "../components/Loading.js";
import { errorMessage } from "../components/ErrorMessage.js";
import { getWeatherData } from "../api/WeatherApi.js";

export class WeatherApp {
  constructor(root) {
    this.root = root;
    this.weatherData = null;
    this.isLoading = false;
    this.hasError = false;

    this.units = {
      temp: "celsius",
      wind: "kmh",
      precip: "mm",
      isOpen: false,
    };

    this.selectedHourlyDayIndex = 0;
  }

  getWeatherIcon(iconId) {
    const iconMap = {
      snow: icons.iconSnow,
      rain: icons.iconRain,
      fog: icons.iconOvercast,
      cloudy: icons.iconOvercast,
      "partly-cloudy-day": icons.iconPartlyCloudy,
      "partly-cloudy-night": icons.iconPartlyCloudy,
      "clear-day": icons.iconSunny,
      "clear-night": icons.iconSunny,
      thunderstorm: icons.iconStorm,
      "showers-day": icons.iconDrizzle,
      "showers-night": icons.iconDrizzle,
    };
    return iconMap[iconId] || icons.iconSunny;
  }

  formatTemp(temp) {
    if (this.units.temp === "fahrenheit")
      return `${Math.round((temp * 9) / 5 + 32)}°`;
    return `${Math.round(temp)}°`;
  }

  formatWind(wind) {
    if (this.units.wind === "mph") return `${(wind * 0.621371).toFixed(1)} mph`;
    return `${wind} km/h`;
  }

  formatPrecip(precip) {
    const amount = precip || 0;
    if (this.units.precip === "in") return `${(amount / 25.4).toFixed(2)} in`;
    return `${amount} mm`;
  }

  async handleSearch() {
    const searchInput = this.root.querySelector(".search__input");
    const city = searchInput ? searchInput.value.trim() : "";

    if (!city) return;

    this.isLoading = true;
    this.hasError = false;
    this.render();

    try {
      const data = await getWeatherData(city);
      this.weatherData = data;
      this.selectedHourlyDayIndex = 0;
    } catch (error) {
      console.error("API Error:", error);
      this.hasError = true;
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  initEvents() {
    // Search Events
    const searchBtn = this.root.querySelector(".search__button");
    const searchInput = this.root.querySelector(".search__input");
    searchBtn?.addEventListener("click", () => this.handleSearch());
    searchInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleSearch();
    });

    // Retry Button Event (From Error Screen)
    const retryBtn = this.root.querySelector("#error-btn");
    if (retryBtn) {
      retryBtn.onclick = () => {
        this.hasError = false;
        this.weatherData = null;
        this.render();
      };
    }

    // Units Events
    const unitsButton = this.root.querySelector("#units-button");
    const unitsDropdown = this.root.querySelector("#units-dropdown");
    const switchBtn = this.root.querySelector(".units__switch-btn");
    const unitRadios = this.root.querySelectorAll(
      '.units__option input[type="radio"]',
    );

    if (unitsButton) {
      unitsButton.onclick = (e) => {
        e.stopPropagation();
        this.units.isOpen = !this.units.isOpen;
        this.render();
      };
    }

    unitRadios.forEach((radio) => {
      radio.onchange = (e) => {
        this.units[e.target.name] = e.target.value;
        this.units.isOpen = true;
        this.render();
      };
    });

    if (switchBtn) {
      switchBtn.onclick = (e) => {
        e.stopPropagation();
        const isCurrentlyMetric = this.units.temp === "celsius";
        this.units = isCurrentlyMetric
          ? { temp: "fahrenheit", wind: "mph", precip: "in", isOpen: true }
          : { temp: "celsius", wind: "kmh", precip: "mm", isOpen: true };
        this.render();
      };
    }

    // Hourly Events
    const hourlyButton = this.root.querySelector("#hourly-btn");
    const hourlyDropdown = this.root.querySelector("#hourly-dropdown");
    const hourlyOptions = this.root.querySelectorAll(".hourly__option");

    if (hourlyButton) {
      hourlyButton.onclick = (e) => {
        e.stopPropagation();
        hourlyDropdown?.classList.toggle("show");
      };
    }

    hourlyOptions.forEach((option) => {
      option.onclick = (e) => {
        this.selectedHourlyDayIndex = parseInt(e.target.dataset.index);
        this.render();
      };
    });

    document.onclick = (e) => {
      if (
        this.units.isOpen &&
        !unitsButton?.contains(e.target) &&
        !unitsDropdown?.contains(e.target)
      ) {
        this.units.isOpen = false;
        this.render();
      }
    };
  }

  render() {
    // 1. Loading State
    if (this.isLoading) {
      this.root.innerHTML = this.getHeaderAndSearchHTML(Loader());
      this.initEvents();
      return;
    }

    // 2. Error State
    if (this.hasError) {
      this.root.innerHTML = `
        <main class="main__wrapper">
          ${this.getHeaderHTML()}
          <section class="main__section">
             ${errorMessage()}
          </section>
        </main>
      `;
      this.initEvents();
      return;
    }

    // 3. Main Weather UI (Handles both Initial Empty state and Populated state)
    const hasData = !!this.weatherData;
    const current = hasData ? this.weatherData.currentConditions : null;
    const days = hasData ? this.weatherData.days : [];
    const selectedDay = hasData ? days[this.selectedHourlyDayIndex] : null;

    // Set up display variables, using placeholders if `hasData` is false
    const titleText = hasData
      ? this.weatherData.resolvedAddress
      : "Search for a city";
    const dateText = new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
    const mainIcon = hasData
      ? this.getWeatherIcon(current.icon)
      : icons.iconSunny;
    const mainTemp = hasData ? this.formatTemp(current.temp) : "--°";

    const feelsLikeStr = hasData ? this.formatTemp(current.feelslike) : "--°";
    const humidityStr = hasData ? `${current.humidity}%` : "--%";
    const windStr = hasData ? this.formatWind(current.windspeed) : "--";
    const precipStr = hasData ? this.formatPrecip(current.precip) : "--";

    const hourlyBtnLabel = hasData
      ? this.selectedHourlyDayIndex === 0
        ? "Today"
        : new Date(selectedDay.datetime).toLocaleDateString("en-US", {
            weekday: "long",
          })
      : "Today";

    // Generate arrays for empty cards if there's no data
    const dailyHtml = hasData
      ? days
          .slice(0, 7)
          .map((day) => this.renderDailyCard(day))
          .join("")
      : Array.from({ length: 7 })
          .map(() => this.renderEmptyDailyCard())
          .join("");

    const hourlyHtml = hasData
      ? selectedDay.hours
          .filter((_, i) => i % 3 === 0)
          .map((hour) => this.renderHourlyCard(hour))
          .join("")
      : Array.from({ length: 8 })
          .map(() => this.renderEmptyHourlyCard())
          .join("");

    const weatherContent = `
      <div class="main__content--grid">
        <section class="info__container">
          <div class="info__card">
            <div class="info__card--top">
              <h2 class="info__card--title">${titleText}</h2>
              <span class="info__card--date">${dateText}</span>
            </div>
            <div class="info__card--bottom">
              <span class="info__card--icon"><img src="${mainIcon}" alt="icon" width="120" ${!hasData ? 'style="opacity: 0.3;"' : ""}/></span>
              <span class="info__card--temp">${mainTemp}</span>
            </div>
          </div>
        </section>

        <section class="forecast__details--grid">
          ${this.renderDetail("Feels Like", feelsLikeStr)}
          ${this.renderDetail("Humidity", humidityStr)}
          ${this.renderDetail("Wind", windStr)}
          ${this.renderDetail("Precipitation", precipStr)}
        </section>

        <section class="daily__forecast--section">
          <h2 class="daily__forecast--title02">Daily Forecast</h2>
          <div class="daily__forecast--grid">
            ${dailyHtml}
          </div>
        </section>

        <section class="hourly__forecast--section">
          <div class="hourly__forecast--top">
            <h2 class="hourly__forecast--title">Hourly Forecast</h2>
            <button class="hourly__forecast--btn" type="button" id="hourly-btn" ${!hasData ? "disabled" : ""}>
              ${hourlyBtnLabel}
              <svg width="10" height="auto" fill="none" viewBox="0 0 13 8"><path fill="#fff" d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"/></svg>              
            </button>
            ${hasData ? HourlyMenu.render(days) : ""}
          </div>
          <div class="hourly__forecast--flex">
            ${hourlyHtml}
          </div>
        </section>
      </div>
    `;

    this.root.innerHTML = this.getHeaderAndSearchHTML(weatherContent);
    this.initEvents();
  }

  getHeaderHTML() {
    return `
      <header class="header__wrapper">
        <div class="header__container">
          <div class="header__logo"><img src="${logo}" alt="logo"/></div>
          <div class="units__container">
            <button class="units__button" type="button" id="units-button">
              <img src="${icons.iconUnits}" alt="units icon" width="14" class="units__wheel"/>
              <p class="units__text">Units</p>
              <svg width="10" height="auto" fill="none" viewBox="0 0 13 8"><path fill="#fff" d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"/></svg>
            </button>
            ${UnitsMenu.render(this.units)}
          </div>
        </div>
      </header>
    `;
  }

  getHeaderAndSearchHTML(content) {
    return `
    <main class="main__wrapper">
      ${this.getHeaderHTML()}
      <section class="main__section">
        <div class="main__container">
          <div class="search__container">
            <h1 class="search__title">How's the sky looking today?</h1>
            <div class="search__form">
              <input type="text" class="search__input" placeholder="Search for a city..." value="${this.weatherData?.address || ""}" ${this.isLoading ? "disabled" : ""}/>
              <img src="${icons.iconSearch}" alt="search icon" class="search__icon" width="19"/>
              <button class="search__button" ${this.isLoading ? "disabled" : ""}>${this.isLoading ? "Searching..." : "Search"}</button>
            </div>
          </div>
          ${content}
        </div>
      </section>
    </main>`;
  }

  renderDetail(title, value) {
    return `
      <div class="forecast__details--card">
        <h3 class="forecast__details--title">${title}</h3>
        <span class="forecast__details--text">${value}</span>
      </div>`;
  }

  renderDailyCard(day) {
    const dayName = new Date(day.datetime).toLocaleDateString("en-US", {
      weekday: "short",
    });
    return `
      <div class="daily__forecast--card">
        <h3 class="daily__forecast--title">${dayName}</h3>
        <span class="daily__forecast--icon"><img src="${this.getWeatherIcon(day.icon)}" alt="icon" width="80"/></span>
        <div class="daily__forecast--bottom">
          <span class="daily__forecast--temp">${this.formatTemp(day.tempmax)}</span>
          <span class="daily__forecast--feels">${this.formatTemp(day.tempmin)}</span>
        </div>
      </div>`;
  }

  renderHourlyCard(hour) {
    const time = hour.datetime.split(":").slice(0, 2).join(":");
    return `
      <div class="hourly__forecast--card">
        <div class="hourly__forecast--time">
          <img src="${this.getWeatherIcon(hour.icon)}" alt="icon" width="30"/>
          <span>${time}</span>
        </div>
        <div class="hourly__forecast--temp"><span>${this.formatTemp(hour.temp)}</span></div>
      </div>`;
  }

  // --- New Methods for Empty States ---

  renderEmptyDailyCard() {
    return `
      <div class="daily__forecast--card">
        <h3 class="daily__forecast--title">--</h3>
        <span class="daily__forecast--icon"><img src="${icons.iconSunny}" alt="icon" width="80" style="opacity: 0.2;"/></span>
        <div class="daily__forecast--bottom">
          <span class="daily__forecast--temp">--°</span>
          <span class="daily__forecast--feels">--°</span>
        </div>
      </div>`;
  }

  renderEmptyHourlyCard() {
    return `
      <div class="hourly__forecast--card">
        <div class="hourly__forecast--time">
          <img src="${icons.iconSunny}" alt="icon" width="30" style="opacity: 0.2;"/>
          <span>--:--</span>
        </div>
        <div class="hourly__forecast--temp"><span>--°</span></div>
      </div>`;
  }
}
