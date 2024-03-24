import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function WeatherButton({ cities, setCity }) {
  return (
    <div>
      <Button
        variant="warning"
        onClick={() => {
          setCity("");
        }}
      >
        Current Location
      </Button>
      {cities.map((item) => (
        <Button
          variant="warning"
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
