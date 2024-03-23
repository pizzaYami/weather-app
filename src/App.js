import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./components/WeatherBox.tsx";
import WeatherButton from "./components/WeatherButton.tsx";
import backgroundVideo from "./assets/backgroundVideo.mp4";
// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도씨, 섭씨, 화씨 날씨상태
// 3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4e60d59c633b09b47705dcc3af310f0&units=metric&lang=kr`;
    let response = await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

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
      <div className="wrap">
        <WeatherBox weather={weather} />
        {/* <WeatherButton /> */}
      </div>
    </div>
  );
}

export default App;
