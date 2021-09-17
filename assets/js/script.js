//THEN I am presented with the city name, the date, an icon representation of weather conditions,
//the temperature, the humidity, the wind speed, and the UV index

var apiKey = "a059151d000029215400bdaa7965fbc2";

var city = "Dallas";
var example = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
console.log(example);

function myFunction() {
  fetch(example)
    .then(function (response) {
        console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

myFunction();