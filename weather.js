const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "4f8f67d06bb466437102b340c2a5a623";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
      return response.json();
    }).then(function(json) {
      //console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      const desc = json.weather[0].description;
      weather.innerText = `${temperature}℃ @ ${place}`;
    }); //데이터가 완전히 넘어왔을 때 함수 호출해준다.
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('Access Error for geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if(loadedCords === null) {
    askForCoords();
  }
  else {
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
