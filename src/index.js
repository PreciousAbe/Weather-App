(function () {
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
  if (weather[country.value.toLowerCase()] !== undefined) {
    city.innerText = country.value
      .toLowerCase()
      .replace(/(^|\s)\S/g, (L) => L.toUpperCase());

    countryName = country.value.toLowerCase();
    country.value = "";
    setCelcius();
  } else {
    alert(
      `Sorry, we don't know the weather for this city, try
      going to https://google.com/search?q=weather+${country.value}`
    );
    country.value = "";
  }
}

document.getElementById("button").addEventListener("click", getCity);

function setCelcius() {
  const temp = document.querySelector("#temp");
  if (weather[countryName] !== undefined) {
    temp.innerText = Math.round(weather[countryName].temp);
  } else {
    console.log("celsius failed");
  }
}

function setFeih() {
  const temp = document.querySelector("#temp");
  if (weather[countryName] !== undefined) {
    temp.innerText = 66;
  } else {
    console.log("Feih failed");
  }
}

document.getElementById("celcius").addEventListener("click", setCelcius);
document.getElementById("feih").addEventListener("click", setFeih);
