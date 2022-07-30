const searchCity = document.getElementById("submitCity");
//store user input in let city variable
let cityName = document.getElementById("cityInput");
const API_KEY = "1d6a84a28c8d241a890752aa40ebeae2";

//second API call with lat and lon for all the weather data I need.
const getDataWithCoordinates = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=1d6a84a28c8d241a890752aa40ebeae2`
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
};

//getting data including lat and lon for second API call
const callApi = (event) => {
  event.preventDefault();
  console.log(cityName.value);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${API_KEY}&units=metric`
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      getDataWithCoordinates(lat, lon);
    });
};

searchCity.addEventListener("click", callApi);
