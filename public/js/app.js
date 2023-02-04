const weatherForm = document.querySelector('form');
const userInput = document.querySelector('input');
const locationTemplate = document.querySelector('#location-template');
const forecastTemplate = document.querySelector('#forecast-template');

weatherForm.addEventListener('submit', async event => {
    event.preventDefault();
    locationTemplate.innerHTML = 'Getting weather update...';
    forecastTemplate.innerHTML = '';
    const weatherForecast = await getWeatherForecast(userInput.value.toUpperCase());
    if (weatherForecast.error) {
        locationTemplate.innerHTML = '';
        forecastTemplate.innerHTML = '';
        alert(weatherForecast.error);
    } else {
        locationTemplate.innerHTML = weatherForecast.location;
        forecastTemplate.innerHTML = weatherForecast.forecast;
    }
});

const getWeatherForecast = async city => {
    const response = await fetch(`http://localhost:3000/weather?city=${city}`);
    return await response.json();
}
