// global variables
var apiKey = '89bb371229142b4c1369e075612a8c99';
var oneCallApi = 'https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&{apiKey}';
var searchHistory = [];

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('wetaher-forecast');
const currentTempEl = document.getElementById('current-temp');
