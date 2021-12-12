// global variables
var apiKey = '0e5d82732443f9583a9754a7983d4289';
var oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,alerts&appid={API key}'
var searchHistory = [];

// DOM elements
var searchForm = document.getElementById('searchForm');
var userInput = document.getElementById('city-name');
var cityContainer =  document.getElementById('show-city');
var historyContainer = document.getElementById('history');
var forcastContainer =  document.getElementById('days-forecast');

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// display search history
function displaySearchHistory() {
 historyContainer.innerHTML = '';

 // Start at end of history array and count down to show the most recent at the top.
 for (var i = searchHistory.length - 1; i >= 0; i--) {
  var btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-controls', 'today forecast');
  btn.classList.add('history-btn', 'btn-history');
 
   // `data-search` allows access to city name when click handler is invoked
   btn.setAttribute('data-search', searchHistory[i]);
   btn.textContent = searchHistory[i];
   searchHistoryContainer.append(btn);
 }
}

// update search history
function addToHistory (search) {
 if (searchHistory.indexOf(search) !== -1) {
  return;
 }
 searchHistory.push(search);

 localStorage.setItem('search-history', JSON.stringify(searchHistory));

 displaySearchHistory();
}

// get search history from local storage
function initSearchHistory() {
 var storedHistory = localStorage.getItem('search-history');
 if (storedHistory) {
   searchHistory = JSON.parse(storedHistory);
 }
 displaySearchHistory();
}




function fetchCoordinates(city){
//fetch api fetchLatLonUrl
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then((res)=>{
  return res.json()
 }).then((data)=>{
  oneCall(data);
 })

}

function oneCall(info){
var lat = info.coord.lat;
var lon = info.coord.lon;
var city = info.name

fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`).then((res)=>{
 return res.json()
}).then((data)=>{
 currentWeather(data.current, city, data.timezone);
})

}

function currentWeather(current, city, timezone){
 var day = dayjs().tz(timezone).format('M/D/YYYY');
 console.log(current)
 var temperature = current.temp;
 var humidity = current.humidity;
 var uvi = current.uvi;
 var wind = current.wind_speed;
 var icon = current.weather[0].icon;

}

// search form
function handleFormSubmit(e){
 // Don't continue if there is nothing in the search form
 if (!searchInput.value) {
  return;
 }

 e.preventDefault();

 var search = userInput.value;
 fetchCoordinates(search);
 searchInput.value = '';
}



initSearchHistory();
searchForm.addEventListener('submit', handleFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);

