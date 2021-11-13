var apiKey = '0e5d82732443f9583a9754a7983d4289';
var oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,alerts&appid={API key}'

var searchForm = document.getElementById('searchForm');
var userInput = document.getElementById('city-name');
var cityContainer =  document.getElementById('show-city');
var historyContainer = document.getElementById('history');
var forcastContainer =  document.getElementById('days-forecast');

function handleFormSubmit(e){
e.preventDefault();

var search = userInput.value;

fetchCoordinates(search);
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
 console.log(data);
})

}
// set local storage


searchForm.addEventListener('submit', handleFormSubmit);
