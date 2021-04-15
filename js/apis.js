/* Variables to change hour, and city text according to where the user is */
const cityName = document.getElementById('city');

/* Variables to show weather conditions according to where the user is */
const dataWeather = document.getElementById('data-weather');
const dataTemperature = document.getElementById('data-temperature');

/* Succes function to know user's coords */
const success = (geolocationPosition) => {
   latitude = geolocationPosition.coords.latitude;
   longitude = geolocationPosition.coords.longitude;
   reverseGeocoding(latitude, longitude);
}

const reverseGeocoding = (lanData, lonData) => {
   fetch(`https://api.opencagedata.com/geocode/v1/json?key=9ae49c142dea410684b52b512a21d6cd&q=${lanData},${lonData}`)
   .then(response => response.json())
   .then(response => {
      /* Show in wich city and country the user is */
      cityName.textContent = `In ${response.results[0].components.city}, ${response.results[0].components.country_code.toUpperCase()}`;
      
      /* Connecting to weather conditions */
      /* I decided to get weather conditions in this function because I cannot find a way to get the city name in a global variable to use in another function */
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${response.results[0].components.city}&appid=ef8d875ebb9b48a112aa1a383d87b616`)
      .then(res => res.json())
      .then(res => {
         dataWeather.textContent = res.weather[0].description;
         dataTemperature.textContent = `${Math.round(res.main.temp - 273.15)} C°`
      })
      .catch(error => console.log(error));
   })
   .catch(err => console.log(err));
}

const error = (errorMessage) => {
   alert('You need to enable geolocation');
}

/* Valid that browser and user allow to use geolocation */
if(navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(success, error);
} else {
   alert('Please, enable geolocation on your browser');
}