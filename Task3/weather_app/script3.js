async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = "3fc1e2be701244e2972154653250811";

    if (!city) {
        document.getElementById('weatherResult').innerHTML = " Please enter a city name.";
        return;
    }

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('weatherResult').innerHTML = "City not found.";
            return;
        }

        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;

        document.getElementById('weatherResult').innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <img src="https:${icon}" alt="${condition}">
            <p>🌡️ Temperature: <strong>${temp}°C</strong></p>
            <p>🌥️ Condition: ${condition}</p>
        `;
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = " Unable to fetch weather data.";
        console.error(error);
    }
}
