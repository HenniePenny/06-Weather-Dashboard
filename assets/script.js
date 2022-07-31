const searchCity = document.getElementById("submitCitySearch");
//store user input in let city variable
const cityName = document.getElementById("cityInput");
const API_KEY = "1d6a84a28c8d241a890752aa40ebeae2";

//second API call with lat and lon for all the weather data I need.
const getDataWithCoordinates = (lat, lon, cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=1d6a84a28c8d241a890752aa40ebeae2&units=metric`;
  fetch(url)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const renderWeatherData = {
        date: data.current.dt,
        icon: data.current.weather[0].icon,
        temp: data.current.temp,
        wind: data.current.wind_speed,
        humidity: data.current.humidity,
        uvindex: data.current.uvi,
      };
      renderWeather(renderWeatherData, cityName);
      get5DayForecast(data.daily);
    });
};

const renderWeather = (renderWeatherData, cityName) => {
  var dateString = moment.unix(renderWeatherData.date).format("MM/DD/YYYY");
  $("#displayCityDateIcon").text(`${cityName} ${dateString}`);
  let icon = $("<img>").attr(
    "src",
    `http://openweathermap.org/img/wn/${renderWeatherData.icon}.png`
  );
  $("#displayCityDateIcon").append(icon);
  $("#wind").text(`wind: ${renderWeatherData.wind}`);
};

const get5DayForecast = (dailyData) => {
  for (let index = 0; index < 5; index++) {
    const element = dailyData[index];
    $(`#day${index + 1} .humidity`).text(`humidity: ${element.humidity}`);
  }
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
      getDataWithCoordinates(lat, lon, data.name);
    });
};

searchCity.addEventListener("click", callApi);
