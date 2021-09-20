//THEN I am presented with the city name, the date, an icon representation of weather conditions,
//the temperature, the humidity, the wind speed, and the UV index

var apiKey = "ca63269de287a28079e1710279049971";
var cityInput = document.querySelector("#city-input");
var example = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
// var ex2 = `api.openweathermap.org/data/2.5/weather?q=Dallas&appid=${apiKey}`
var cityBtn = document.querySelector("#search-btn");
var cityNameEl = document.querySelector("#city-name");
var cityArr = [];

console.log(example);

function myFunction() {
  fetch(example)
    .then(function (response) {
        console.log(response);
      response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

myFunction();

var formHandler = function(event) {

  var selectedCity = cityInput
    .value
    .toLowerCase()
    .trim()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

    if (selectedCity) {
      getCoords(selectedCity);
      cityInput.value = '';
    } else {
      alert("Please enter a city!");
    };
};

var getCoords = function (city) {
  var example = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  
  fetch (example).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        var long = data.coord["lon"];
        var lati = data.coord["lat"];
        getCityForecast(city, long, lati);

        if (document.querySelector(".city-list")) {
            document.querySelector(".city-list").remove();
        }

        saveCity(city);
        loadCities();
      });
    } else {
      alert(`Error: ${response.statusText}`)
    }
  })
  .catch(function(error) {
    alert("Unable to load weather.");
  })
}

var getCityForecast = function(city, long, lati) {
  var oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;

    fetch(oneCallApi).then(function(response) {

      if (response.ok) {
        response.json().then(function(data) {

          cityNameEl.textContent = `${city} (${moment().format("M/D/YYYY")})`;
          console.log(data)

          currentForecast(data);
          fiveDayForecast(data);
        });
      }
    })
}

var displayTemp = function(element, temperature) {
  var tempEl = document.querySelector(element);
  var elementText = Math.round(temperature);
  tempEl.textContent = elementText;

}

var currentForecast = function(forecast) {

  var forecastEl = document.querySelector(".city-forecast");
  forecastEl.classList.remove("hide");

  var weatherIconEl = document.querySelector("#today-icon");
  var currentIcon = forecast.current.weather[0].icon;
  weatherIconEl.setAttribute("src", `http://openweathermap.org/img/wn/${currentIcon}.png`);
  weatherIconEl.setAttribute("alt", forecast.current.weather[0].main)

  displayTemp("#current-temp", forecast.current["temp"]);
  displayTemp("#current-feels-like", forecast.current["feels_like"]);
  displayTemp("#current-high", forcast.daily[0].temp.max);
  displayTemp("#current-low", forecast.daily[0].temp.min);

  var currentConditionEl = document.querySelector("#current-condition");
  currentConditionEl.textContent = forecast.current.weather[0].description
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  var currentHumidityEl = document.querySelector("#current-humidity");
  currentHumidityEl.textContent = forecast.current ["humidity"];

  var currentWindEl = document.querySelector("#current-wind-speed")
  currentWindEl.textContent = forecast.current["wind_speed"];

  var uviEl = document.querySelector("#current-uvi")
  var currentUvi = forecast.current["uvi"];
  uviEl.textContent = currentUvi;

  switch (true) {
    case (currentUvi <=2):
      uviEl.className = "badge badge-success";
      break;
    case (currentUvi <= 5):
      uviEl.className = "badge badge-warning";
      break;
    case (currentUvi <= 7):
        uviEl.className = "badge badge-danger";
        break;
    default:
      uvi.className = "badge text-light";
      uviEl.setAttribute("style", "background-color: #6136a3");
  }
}

var fiveDayForecast = function(forecast) {

  for (var i = 1; i < 6; i++) {
    var dateP = document.querySelector("#date-" + i);
    dateP.textContent = moment().add(i, "days").format("M/D/YYYY");

    var iconImg = document.querySelector("#icon-" + i);
    var iconCode = forecast.daily[i].weather[0].icon;
    iconImg.setAttribute("src", `http://openweathermap.org/img/wn/${iconCode}.png`);
    iconImg.setAttribute("alt", forecast.daily[i].weather[0].main);

    displayTemp("#temp-" + i, forecast.daily[i].temp.day);
    displayTemp("#high-" + i, forecast.daily[i].temp.max);
    displayTemp("#low-" + i, forecast.daily[i].temp.min);

    var humiditySpan = document.querySelector("#humidity-" + i);
    humiditySpan.textContent = forecast.daily[i].humidity;
  }
}

var saveCity = function (city) {

  for (var i = 0; i < cityArr.length; i++) {
    if (city === cityArr[i]) {
      cityArr.splice(i, 1);
    }
  }

  cityArr.push(city);
  localStorage.setItem("cities", JSON.stringify(cityArr));
}

var loadCities = function() {
  cityArr = JSON.parse(localStorage.getItem("cities"));

    if (!cityArr) {
      cityArr = [];
      return false;
    } else if (cityArr.length > 5) {
      cityArr.shift();
    }

    var recentCities = document.querySelector("#recent-cities");
    var cityListUl = document.createElement('ul');
    cityListUl.className = "list-group list-group-flush city-list";
    recentCities.appendChild(cityListUl);

    for (var i = 0; i < cityArr.length; i++) {
      var cityListItem = document.createElement("button");
      cityListItem.setAttribute("type", "button");
      cityListItem.className = "list-group-item";
      cityListItem.setAttribute("value", cityArr[i]);
      cityListItem.textContent = cityArr[i];
      cityListUl.prepend(cityListItem);
    }

    var cityList = document.querySelector(".city-list");
    cityList.addEventListener("click", selectRecent)
}

