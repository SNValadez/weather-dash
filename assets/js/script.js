//THEN I am presented with the city name, the date, an icon representation of weather conditions,
//the temperature, the humidity, the wind speed, and the UV index

var apiKey = "ca63269de287a28079e1710279049971";

var city = "Dallas";
var example = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
var ex2 = `api.openweathermap.org/data/2.5/weather?q=Dallas&appid=${apiKey}`

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

