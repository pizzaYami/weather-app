import React, { useState } from "react";

function WeatherBox({ weather }) {
  const [isCelsius, setIsCelsius] = useState(true);
  setTimeout(() => {
    setIsCelsius(!isCelsius);
  }, 2000);

  return (
    <div className="WeatherContainer">
      <h1 id="title">{weather?.name}</h1>
      <h2>
        {isCelsius
          ? `${Number(weather?.main.temp).toFixed(1)}°C`
          : `${Number(weather?.main.temp * 1.8 + 32).toFixed(1)}℉`}
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
}

export default WeatherBox;
