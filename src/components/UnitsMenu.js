export class UnitsMenu {
  static render() {
    return `
      <div class="units__dropdown" id="units-dropdown">
        <button class="units__dropdown-switch" type="button">Switch to Imperial</button>
        
        <div class="units__dropdown-group">
          <p class="units__dropdown-label">Temperature</p>
          <label class="units__dropdown-option">
            Celsius (°C)
            <input type="radio" name="temperature" value="celsius" checked>
          </label>
          <label class="units__dropdown-option">
            Fahrenheit (°F)
            <input type="radio" name="temperature" value="fahrenheit">
          </label>
        </div>

        <div class="units__dropdown-group">
          <p class="units__dropdown-label">Wind Speed</p>
          <label class="units__dropdown-option">
            km/h
            <input type="radio" name="wind" value="kmh" checked>
          </label>
          <label class="units__dropdown-option">
            mph
            <input type="radio" name="wind" value="mph">
          </label>
        </div>

        <div class="units__dropdown-group">
          <p class="units__dropdown-label">Precipitation</p>
          <label class="units__dropdown-option">
            Millimeters (mm)
            <input type="radio" name="precipitation" value="mm" checked>
          </label>
          <label class="units__dropdown-option">
            Inches (in)
            <input type="radio" name="precipitation" value="in">
          </label>
        </div>
      </div>
    `;
  }
}
