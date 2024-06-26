function updateTime() {
  // Current Location
  let currentLocationElement = document.querySelector("#current-location");
  if (currentLocationElement.style.display !== "none") {
    let currentCityNameElement = document.querySelector("#current-city-name");
    let currentCityDateElement = currentLocationElement.querySelector(".date");
    let currentCityTimeElement = currentLocationElement.querySelector(".time");
    let currentCityTimeZone = moment.tz.guess();
    let currentCityTime = moment().tz(currentCityTimeZone);

    currentCityNameElement.innerHTML = currentCityTimeZone
      .replace("_", " ")
      .split("/")[1];
    currentCityDateElement.innerHTML = currentCityTime.format("MMMM Do YYYY");
    currentCityTimeElement.innerHTML = currentCityTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  // Los Angeles
  let losAngelesElement = document.querySelector("#los-angeles");
  if (losAngelesElement) {
    let losAngelesDateElement = losAngelesElement.querySelector(".date");
    let losAngelesTimeElement = losAngelesElement.querySelector(".time");
    let losAngelesTime = moment().tz("America/Los_Angeles");

    losAngelesDateElement.innerHTML = losAngelesTime.format("MMMM	Do YYYY");
    losAngelesTimeElement.innerHTML = losAngelesTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  // Paris
  let parisElement = document.querySelector("#paris");
  if (parisElement) {
    let parisDateElement = parisElement.querySelector(".date");
    let parisTimeElement = parisElement.querySelector(".time");
    let parisTime = moment().tz("Europe/Paris");

    parisDateElement.innerHTML = parisTime.format("MMMM	Do YYYY");
    parisTimeElement.innerHTML = parisTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}

function updateCity(event) {
  let cityTimeZone = event.target.value;

  // Se o valor selecionado for vazio, restaura o conteúdo original
  if (cityTimeZone === "") {
    document.querySelector("#cities").innerHTML = `
      <div class="city" id="current-location">
        <div>
          <h2 id="current-city-name"></h2>
          <div class="date"></div>
        </div>
        <div class="time"></div>
      </div>
      <div class="city" id="los-angeles">
        <div>
          <h2>Los Angeles</h2>
          <div class="date"></div>
        </div>
        <div class="time"></div>
      </div>
      <div class="city" id="paris">
        <div>
          <h2>Paris</h2>
          <div class="date"></div>
        </div>
        <div class="time"></div>
      </div>
    `;
    // Re-aplicar a função updateTime após restaurar o conteúdo original
    updateTime();
    return;
  }

  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
  <div class="city">
    <div>
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM	Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format(
    "A"
  )}</small></div>
  </div>
  <a href="index.html">All cities</a>
  `;
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
