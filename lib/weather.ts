export interface WeatherData {
  temperature: number; 
  condition: string;
  humidity: number; 
  windSpeed: number; 
  icon: string; 
}

export async function getWeather(
  destination: string
): Promise<WeatherData | null> {
  try {
    // Geocode destination
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        destination
      )}&count=1&language=en&format=json`
    );

    if (!geoResponse.ok) throw new Error("Failed to geocode destination");

    const geoData = await geoResponse.json();
    if (!geoData.results || geoData.results.length === 0) return null;

    const { latitude, longitude } = geoData.results[0];

    // Fetch weather in Celsius
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh`
    );

    if (!weatherResponse.ok) throw new Error("Failed to fetch weather");

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;

    // More complete weather codes mapping
    const weatherConditions: Record<
      number,
      { condition: string; icon: string }
    > = {
      0: { condition: "Clear Sky", icon: "☀️" },
      1: { condition: "Mainly Clear", icon: "🌤️" },
      2: { condition: "Partly Cloudy", icon: "⛅" },
      3: { condition: "Overcast", icon: "☁️" },
      45: { condition: "Foggy", icon: "🌫️" },
      48: { condition: "Depositing Rime Fog", icon: "🌫️" },
      51: { condition: "Light Drizzle", icon: "🌦️" },
      53: { condition: "Moderate Drizzle", icon: "🌦️" },
      55: { condition: "Dense Drizzle", icon: "🌧️" },
      61: { condition: "Slight Rain", icon: "🌧️" },
      63: { condition: "Moderate Rain", icon: "🌧️" },
      65: { condition: "Heavy Rain", icon: "🌧️" },
      71: { condition: "Slight Snowfall", icon: "🌨️" },
      73: { condition: "Moderate Snowfall", icon: "❄️" },
      75: { condition: "Heavy Snowfall", icon: "❄️" },
      77: { condition: "Snow Grains", icon: "🌨️" },
      80: { condition: "Slight Rain Showers", icon: "🌦️" },
      81: { condition: "Moderate Rain Showers", icon: "🌧️" },
      82: { condition: "Violent Rain Showers", icon: "⛈️" },
      95: { condition: "Thunderstorm", icon: "⛈️" },
      96: { condition: "Thunderstorm with Hail", icon: "🌩️" },
      99: { condition: "Severe Thunderstorm with Hail", icon: "🌩️" },
    };

    const weatherInfo = weatherConditions[current.weather_code] || {
      condition: "Unknown",
      icon: "🌡️",
    };

    return {
      temperature: Math.round(current.temperature_2m),
      condition: weatherInfo.condition,
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      icon: weatherInfo.icon,
    };
  } catch (error) {
    console.error("[getWeather] Error:", error);
    return null;
  }
}
