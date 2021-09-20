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


