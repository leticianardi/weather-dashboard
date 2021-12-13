// global variables
var apiKey = '0e5d82732443f9583a9754a7983d4289';
var oneCallApi = 'https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&{apiKey}';
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

// display the current weather
function currentWeather(current, city, timezone){
 var day = dayjs().tz(timezone).format('M/D/YYYY');
 console.log(current)

 var temperature = current.temp;
 var humidity = current.humidity;
 var uvi = current.uvi;
 var wind = current.wind_speed;
 var icon = current.weather[0].icon;
 var iconDescription = weather.weather[0].description || weather[0].main;

 var card = document.createElement('div');
 var cardBody = document.createElement('div');
 var heading = document.createElement('h2');
 var weatherIcon = document.createElement('img');
 var tempEl = document.createElement('p');
 var windEl = document.createElement('p');
 var humidityEl = document.createElement('p');
 var uvEl = document.createElement('p');
 var uviBadge = document.createElement('button');

 card.setAttribute('class', 'card');
 cardBody.setAttribute('class', 'card-body');
 card.append(cardBody);

 heading.setAttribute('class', 'h3 card-title');
 tempEl.setAttribute('class', 'card-text');
 windEl.setAttribute('class', 'card-text');
 humidityEl.setAttribute('class', 'card-text');

 heading.textContent = `${city} (${date})`;
 weatherIcon.setAttribute('src', icon);
 weatherIcon.setAttribute('alt', iconDescription);
 weatherIcon.setAttribute('class', 'weather-img');
 heading.append(weatherIcon);
 tempEl.textContent = `Temp: ${temperature}°F`;
 windEl.textContent = `Wind: ${wind} MPH`;
 humidityEl.textContent = `Humidity: ${humidity} %`;
 cardBody.append(heading, tempEl, windEl, humidityEl);

 uvEl.textContent = 'UV Index: ';
 uviBadge.classList.add('btn', 'btn-sm');

 if (uvi < 3) {
  uviBadge.classList.add('btn-success');
 } else if (uvi < 7) {
   uviBadge.classList.add('btn-warning');
 } else {
   uviBadge.classList.add('btn-danger');
 }

 uviBadge.textContent = uvi;
 uvEl.append(uviBadge);
 cardBody.append(uvEl);

 todayContainer.innerHTML = '';
 todayContainer.append(card);
}

function fetchCoordinates(city){
//fetch api fetchLatLonUrl
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
 .then((res)=>{
  return res.json()
 }).then((data)=>{
  oneCall(data);
 })

}

function renderItems(city, data) {
 renderCurrentWeather(city, data.current, data.timezone);
 renderForecast(data.daily, data.timezone);
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
console.log(data)


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
// searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);

