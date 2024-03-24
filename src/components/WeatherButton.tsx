import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function WeatherButton({ cities, setCity, city }) {
  return (
    <div className="BtnContainer">
      {cities.map((item) => (
        <Button
          className={`btn ${
            item === city ? "btn-primary" : "btn-light"
          } btn-outline-black`}
          key={item}
          onClick={() => {
            setCity(item);
          }}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

export default WeatherButton;
