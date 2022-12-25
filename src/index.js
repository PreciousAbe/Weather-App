let temperatureCelcius;

(function () {

  function getDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  function getCurrentWeather(city = 'Lagos') {
    let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const icon = document.getElementById('weatherIcon');
    const weatherDesc = document.getElementById("weatherDesc");
    const wind = document.getElementById("wind");
    const humidity = document.getElementById("humidity");
    // const precipitation = document.getElementById("precipitation");
    const temp = document.getElementById("temp");

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        getDailyWeather(data.coord);
        const weather = data.weather[0];
        const mainWeather = data.main;

        let iconUrl = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        icon.src = iconUrl;
        weatherDesc.innerText = weather.main;
        wind.innerText = data.wind.speed;
        humidity.innerText = mainWeather.humidity;
        // precipitation.innerText = 0;
        temp.innerText = Math.round(mainWeather.temp);
        temperatureCelcius = Math.round(mainWeather.temp);

      })
      .catch(err => console.error(err));
  }

  function getDailyWeather(coord) {

    let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
    const container = document.getElementById('dailyHolder');

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        const daily = data.daily;

        let div = `<div class="row justify-content-between">`;
        daily.forEach((day, i) => {
          if (i < 7) {
            let celcius = Math.round(day.temp.max);
            let feih = Math.round((celcius * 1.8) + 32);
            div = div + `<div class="col text-center">
              <p class="m-0">${getDay(day.dt)}</p>
              <p class="m-0">
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" width="100">
              </p>
              <p class="m-0"><span class="text-dark text-bold">${celcius}°C</span> <small>${feih}°F</small></p>
            </div>`;
          }
        })

        div = div + `</div>`;

        container.innerHTML = div;
      })
      .catch(err => console.error(err));
  }

  getCurrentWeather('Lagos');

  const timeElem = document.getElementById("time");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const d = new Date();
  let day = days[d.getDay()];

  let hours = d.getHours();
  let minutes = d.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = hours + ":" + minutes + "" + ampm;

  timeElem.innerText = day + " " + time;
})();

let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  },
  lagos: {
    temp: 29,
    humidity: 30
  },
  abuja: {
    temp: 30,
    humidity: 19
  },
  Kaduna: {
    temp: -16,
    humidity: 10
  },
  delta: {
    temp: 57,
    humidity: 28
  },
  ibadan: {
    temp: 64,
    humidity: 12
  },
  ghana: {
    temp: 23,
    humidity: 8
  }
};
const country = document.getElementById("country");
const city = document.getElementById("city");

let countryName;

function getCity() {
  // if (weather[country.value.toLowerCase()] !== undefined) {
  //   city.innerText = country.value
  //     .toLowerCase()
  //     .replace(/(^|\s)\S/g, (L) => L.toUpperCase());

  //   countryName = country.value.toLowerCase();
  //   // country.value = "";
  //   setCelcius();
  // } else {
  //   alert(
  //     `Sorry, we don't know the weather for this city, try
  //     going to https://google.com/search?q=weather+${country.value}`
  //   );
  //   country.value = "";
  // }

  getCurrentWeather(country.value);

  city.innerText = country.value
    .toLowerCase()
    .replace(/(^|\s)\S/g, (L) => L.toUpperCase());
}

document.getElementById("button").addEventListener("click", getCity);

function setCelcius() {
  const temp = document.querySelector("#temp");
  temp.innerText = Math.round(temperatureCelcius);
}

function setFeih() {
  const temp = document.querySelector("#temp");
  temp.innerText = Math.round((temperatureCelcius * 1.8) + 32);;
}

function getDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getCurrentWeather(city = 'Lagos') {
  let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const icon = document.getElementById('weatherIcon');
  const weatherDesc = document.getElementById("weatherDesc");
  const wind = document.getElementById("wind");
  const humidity = document.getElementById("humidity");
  const precipitation = document.getElementById("precipitation");
  const temp = document.getElementById("temp");
  const cityName = document.getElementById("city");


  fetch(url, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      getDailyWeather(data.coord);
      const weather = data.weather[0];
      const mainWeather = data.main;

      let iconUrl = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
      icon.src = iconUrl;
      weatherDesc.innerText = weather.main;
      wind.innerText = data.wind.speed + 'km/h';
      humidity.innerText = mainWeather.humidity + '%';
      // precipitation.innerText = 0;
      temp.innerText = Math.round(mainWeather.temp);
      cityName.innerText = data.name;
      temperatureCelcius = Math.round(mainWeather.temp);

    })
    .catch(err => console.error(err));
}

function getDailyWeather(coord) {
  let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  const container = document.getElementById('dailyHolder');

  fetch(url, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      const daily = data.daily;

      let div = `<div class="row justify-content-between">`;
      daily.forEach((day, i) => {
        if (i < 7) {
          let celcius = Math.round(day.temp.max);
          let feih = Math.round((celcius * 1.8) + 32);
          div = div + `<div class="col text-center">
              <p class="m-0">${getDay(day.dt)}</p>
              <p class="m-0">
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" width="100">
              </p>
              <p class="m-0">
              <span class='text-dark text-bold'>${celcius}°C</span> 
              <small>${feih}°F</small>
              </p>
            </div>`;
        }
      })

      div = div + `</div>`;

      container.innerHTML = div;


    })
    .catch(err => console.error(err));
}

document.getElementById("celcius").addEventListener("click", setCelcius);
document.getElementById("feih").addEventListener("click", setFeih);

search ("Lagos");