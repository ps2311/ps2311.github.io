// script.js
const apiKey = '386a6dabf8ea3bf3fc2802077d1ebcae'; // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key

const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');
const background = document.querySelector('.background');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location === '') {
        alert('Please enter a location.');
        return;
    }
    fetchWeather(location);
});

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
            weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
        });
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherIcon = data.weather[0].icon;
    const backgroundImage = getBackgroundImage(weatherIcon);

    background.style.backgroundImage = `url('${backgroundImage}')`;

    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

function getBackgroundImage(weatherIcon) {
    // Map weather icons to background images
    const iconToImageMap = {
        '01d': 'assets/clear-sky-day.jpg',
        '01n': 'assets/clear-sky-night.jpg',
        '02d': 'assets/few-clouds-day.jpg',
        '02n': 'assets/few-clouds-night.jpg',
        '03d': 'assets/scattered-clouds.jpg',
        '03n': 'assets/scattered-clouds.jpg',
        '04d': 'assets/broken-clouds-day.jpg',
        '04n': 'assets/broken-clouds-night.jpg',
        '09d': 'assets/shower-rain.jpg',
        '09n': 'assets/shower-rain.jpg',
        '10d': 'assets/rain-day.jpg',
        '10n': 'assets/rain-night.jpg',
        '11d': 'assets/thunderstorm-day.jpg',
        '11n': 'assets/thunderstorm-night.jpg',
        '13d': 'assets/snow-day.jpg',
        '13n': 'assets/snow-night.jpg',
        '50d': 'assets/mist-day.jpg',
        '50n': 'assets/mist-night.jpg'
    };

    // Default background image if the icon is not found
    const defaultImage = 'assets/default-background.jpg';
    return iconToImageMap[weatherIcon] || defaultImage;
}
