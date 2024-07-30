const apiKey = 'c5fd0237d966f0380afe0c77de0d98e6'; // Replace with your OpenWeatherMap API key

async function fetchWeather() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location.');
        return;
    }

    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            weatherInfoDiv.innerHTML = `Error: ${data.message}`;
            return;
        }

        const { main, weather, wind, sys } = data;
        const weatherDescription = weather[0].description;
        const temperature = main.temp;
        const humidity = main.humidity;
        const windSpeed = wind.speed;

        weatherInfoDiv.innerHTML = `
            <h2>${data.name}, ${sys.country}</h2>
            <p><strong>Weather:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature} °C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        `;
    } catch (error) {
        weatherInfoDiv.innerHTML = `Error: ${error.message}`;
    }
}

async function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
                const data = await response.json();

                if (data.cod !== 200) {
                    document.getElementById('weather-info').innerHTML = `Error: ${data.message}`;
                    return;
                }

                const { main, weather, wind, sys } = data;
                const weatherDescription = weather[0].description;
                const temperature = main.temp;
                const humidity = main.humidity;
                const windSpeed = wind.speed;

                document.getElementById('weather-info').innerHTML = `
                    <h2>${data.name}, ${sys.country}</h2>
                    <p><strong>Weather:</strong> ${weatherDescription}</p>
                    <p><strong>Temperature:</strong> ${temperature} °C</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                `;
            } catch (error) {
                document.getElementById('weather-info').innerHTML = `Error: ${error.message}`;
            }
        }, (error) => {
            document.getElementById('weather-info').innerHTML = `Error: ${error.message}`;
        });
    } else {
        document.getElementById('weather-info').innerHTML = 'Geolocation is not supported by this browser.';
    }
}
