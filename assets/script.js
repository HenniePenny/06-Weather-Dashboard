const searchCity = document.getElementById("submitCity");
const API_KEY = "1d6a84a28c8d241a890752aa40ebeae2";

//store user input in let city variable
let city;
let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

//fetch(queryURL);

const callApi = () => {
  console.log("hello!");
};

searchCity.addEventListener("click", callApi);
