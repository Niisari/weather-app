export class UnitsMenu {
  static render() {
    const checkIcon = `
      <svg class="units__checkmark" width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path d="M1 5L4.5 8.5L11 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

    return `
      <div class="units__dropdown" id="units-dropdown">
        <button class="units__switch-btn" type="button">Switch to Imperial</button>
        
        <div class="units__group">
          <p class="units__label">Temperature</p>
          <label class="units__option">
            <span>Celsius (°C)</span>
            <input type="radio" name="temp" value="celsius" checked>
            ${checkIcon}
          </label>
          <label class="units__option">
            <span>Fahrenheit (°F)</span>
            <input type="radio" name="temp" value="fahrenheit">
            ${checkIcon}
          </label>
        </div>

        <div class="units__group">
          <p class="units__label">Wind Speed</p>
          <label class="units__option">
            <span>km/h</span>
            <input type="radio" name="wind" value="kmh" checked>
            ${checkIcon}
          </label>
          <label class="units__option">
            <span>mph</span>
            <input type="radio" name="wind" value="mph">
            ${checkIcon}
          </label>
        </div>

        <div class="units__group">
          <p class="units__label">Precipitation</p>
          <label class="units__option">
            <span>Millimeters (mm)</span>
            <input type="radio" name="precip" value="mm" checked>
            ${checkIcon}
          </label>
          <label class="units__option">
            <span>Inches (in)</span>
            <input type="radio" name="precip" value="in">
            ${checkIcon}
          </label>
        </div>
      </div>
    `;
  }
}
