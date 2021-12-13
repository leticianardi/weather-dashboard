// global variables
var apiKey = '89bb371229142b4c1369e075612a8c99';
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


// get coordinates from API
function fetchCoordinates(city){
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
 .then((res)=>{
   if (res.ok) {
    return res.json()
  }
 }).then((data)=>{
  oneCall(data);
 })
}

function oneCall(info) {
  var lat = info.coord.lat;
  var lon = info.coord.lon;
  var city = info.name

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`).then((res)=>{
    return res.json()
  }).then((data)=>{
  currentWeather(data.current, city, data.timezone);
  })
  console.log(data)
}

// display current date
function displayDate() {
  return moment().format('MMMM Do YYYY, HH:mm');
}


// // display the current weather
// function currentWeather(current, city, timezone){
//  var day = dayjs().tz(timezone).format('M/D/YYYY');
//  console.log(current)

//  var temperature = current.temp;
//  var humidity = current.humidity;
//  var uvi = current.uvi;
//  var wind = current.wind_speed;
//  var icon = current.weather[0].icon;
//  var iconDescription = weather.weather[0].description || weather[0].main;

//  var card = document.createElement('div');
//  var cardBody = document.createElement('div');
//  var heading = document.createElement('h2');
//  var weatherIcon = document.createElement('img');
//  var tempEl = document.createElement('p');
//  var windEl = document.createElement('p');
//  var humidityEl = document.createElement('p');
//  var uvEl = document.createElement('p');
//  var uviBadge = document.createElement('button');

//  card.setAttribute('class', 'card');
//  cardBody.setAttribute('class', 'card-body');
//  card.append(cardBody);

//  heading.setAttribute('class', 'h3 card-title');
//  tempEl.setAttribute('class', 'card-text');
//  windEl.setAttribute('class', 'card-text');
//  humidityEl.setAttribute('class', 'card-text');

//  heading.textContent = `${city} (${date})`;
//  weatherIcon.setAttribute('src', icon);
//  weatherIcon.setAttribute('alt', iconDescription);
//  weatherIcon.setAttribute('class', 'weather-img');
//  heading.append(weatherIcon);
//  tempEl.textContent = `Temp: ${temperature}°F`;
//  windEl.textContent = `Wind: ${wind} MPH`;
//  humidityEl.textContent = `Humidity: ${humidity} %`;
//  cardBody.append(heading, tempEl, windEl, humidityEl);

//  uvEl.textContent = 'UV Index: ';
//  uviBadge.classList.add('btn', 'btn-sm');

//  if (uvi < 3) {
//   uviBadge.classList.add('btn-success');
//  } else if (uvi < 7) {
//    uviBadge.classList.add('btn-warning');
//  } else {
//    uviBadge.classList.add('btn-danger');
//  }

//  uviBadge.textContent = uvi;
//  uvEl.append(uviBadge);
//  cardBody.append(uvEl);

//  todayContainer.innerHTML = '';
//  todayContainer.append(card);
// }

// // display daily forecast

// // display 5 day forecast 



// function renderItems(city, data) {
//  renderCurrentWeather(city, data.current, data.timezone);
//  renderForecast(data.daily, data.timezone);
// }




// // search form
// function handleFormSubmit(e){
//  // Don't continue if there is nothing in the search form
//  if (!searchInput.value) {
//   return;
//  }

//  e.preventDefault();

//  var search = userInput.value;
//  fetchCoordinates(search);
//  searchInput.value = '';
// }



// initSearchHistory();
// searchForm.addEventListener('submit', handleFormSubmit);
// // searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);