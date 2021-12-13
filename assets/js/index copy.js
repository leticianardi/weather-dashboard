
// dayjs.extend(window.dayjs_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);

let weather = {
  apiKey: "0e5d82732443f9583a9754a7983d4289",
  
  fetchWeather: function (city) {
    fetch(`api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
            throw new Error("No weather found.");
        }
        return response.json();
        })
    .then((data) => this.displayWeather(data));
  }
}

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const {temp, humid } = data.main;
  const { speed } = data.wind
  console.log(name, icon, description, temp, humid, speed)
}




