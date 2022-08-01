const searchCity = document.getElementById("submitCitySearch");
//store user input in let city variable
const cityName = document.getElementById("cityInput");
const API_KEY = "1d6a84a28c8d241a890752aa40ebeae2";

//second API call with lat and lon for all the weather data I need.
const getDataWithCoordinates = (lat, lon, cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=1d6a84a28c8d241a890752aa40ebeae2&units=metric`;
  fetch(url)
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .then((data) => {
      // console.log(data);
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
  let dateString = moment.unix(renderWeatherData.date).format("DD.MM.YYYY");
  $("#displayCityDateIcon").text(`${cityName} ${dateString}`);
  let icon = $("<img>").attr(
    "src",
    `http://openweathermap.org/img/wn/${renderWeatherData.icon}.png`
  );
  $("#displayCityDateIcon").append(icon);
  $("#temp").text(`Temp: ${renderWeatherData.temp} °C`);
  $("#wind").text(`Wind: ${renderWeatherData.wind}`);
  $("#humidity").text(`Humidity: ${renderWeatherData.humidity}`);
  $("#uvi").text(`UV Index: ${renderWeatherData.uvindex}`);
  // $("#uviColor").text(`UV Index: ${renderWeatherData.uvindex}`);

  if (renderWeatherData.uvindex <= 2) {
    $("#uvi").css({ "background-color": "#4EC20B" });
    // $("#uvi").text(`UV Index: ${renderWeatherData.uvindex}`);
  } else if (renderWeatherData.uvindex <= 5) {
    $("uvi").css({ "background-color": "#FCB72C" });
  } else {
    $("#uvi").css({ "background-color": "#DA1906" });
  }
};

const get5DayForecast = (dailyData) => {
  let forecastHeading = $("<h3>").text("5-Day Forecast:");
  $(`#weatherToday`).append(forecastHeading);
  for (let index = 0; index < 5; index++) {
    const element = dailyData[index];
    let dateString2 = moment.unix(element.dt).format("DD.MM.YYYY");
    $(`#day${index + 1} .date`).text(`${dateString2}`);
    let icon2 = $("<img>").attr(
      "src",
      `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`
    );
    $(`#day${index + 1} .weatherIcon`).append(icon2);
    $(`#day${index + 1} .temp`).text(`Temp: ${element.temp.day}°C`);
    $(`#day${index + 1} .wind`).text(`Wind: ${element.wind_speed}`);
    $(`#day${index + 1} .humidity`).text(`Humidity: ${element.humidity}`);
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
      // console.log(res);
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      getDataWithCoordinates(lat, lon, data.name);
    });
};

searchCity.addEventListener("click", callApi);
