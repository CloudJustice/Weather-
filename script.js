
const apiKey = "64760ebedc8f452232d3370074822bd8"; // Your API key

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    showError("Please enter a city name.");
  }
});

async function fetchWeather(city) {
  const weatherContainer = document.getElementById("weather");
  weatherContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("City not found.");
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeather(data) {
  const weatherContainer = document.getElementById("weather");
  weatherContainer.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

function showError(message) {
  const weatherContainer = document.getElementById("weather");
  weatherContainer.innerHTML = `<p class="error">${message}</p>`;
}
