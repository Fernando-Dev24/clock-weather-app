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
   fetch(`http://api.positionstack.com/v1/reverse?access_key=9b99309ba340d050baf93972252c6339&query=${lanData},${lonData}`)
   .then(response => response.json())
   .then(response => {
      /* Show in wich city and country the user is */
      cityName.textContent = `In ${response.data[0].region}, ${response.data[0].country}`;
      
      /* Connecting to weather conditions */
      /* I decided to get weather conditions in this function because I cannot find a way to get the city name in a global variable to use in another function */
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${response.data[0].region}&appid=ef8d875ebb9b48a112aa1a383d87b616`)
      .then(res => res.json())
      .then(res => {
         console.log(res);
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