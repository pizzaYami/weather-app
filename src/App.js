import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./components/WeatherBox.tsx";
import WeatherButton from "./components/WeatherButton.tsx";
import backgroundVideo from "./assets/backgroundVideo.mp4";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도씨, 섭씨, 화씨 날씨상태
// 3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("current");
  const [loading, setLoading] = useState(true);

  const cities = ["current", "paris", "new york", "tokyo"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4e60d59c633b09b47705dcc3af310f0&units=metric&lang=kr`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4e60d59c633b09b47705dcc3af310f0&units=metric&lang=kr`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      setLoading(false);
      setWeather(data);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city === "current") {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className="container">
      <video
        src={backgroundVideo}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="background"
      />
      {loading ? (
        <ClipLoader
          color="#f88c6b"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="wrap">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} city={city} />
        </div>
      )}
    </div>
  );
}

export default App;
