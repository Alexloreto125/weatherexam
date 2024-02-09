import { useState } from "react";
import "./App.css";
import NavbarComponents from "./components/NavbarComponents";
import "bootstrap/dist/css/bootstrap.min.css";
import Forecast from "./components/Forecast";

function App() {
  const [weather, setWeather] = useState({
    icon: "https://openweathermap.org/img/wn/10d@2x.png",
    temp: "10",
    city: "Corea",
    humidity: "20",
    speed: "50",
  });
  const [units, setUnits] = useState("metric");
  const [selectedUnitText, setSelectedUnitText] = useState("°C");

  const handleUnitChange = (newUnit) => {
    setUnits(newUnit);
    setSelectedUnitText(newUnit === "metric" ? "°C" : "°F");
  };
  return (
    <div className="Container">
      <NavbarComponents
        weather={weather}
        setWeather={setWeather}
        units={units}
        setUnits={setUnits}
        selectedUnitText={selectedUnitText}
        setSelectedUnitText={setSelectedUnitText}
        handleUnitChange={handleUnitChange}
      />
      <Forecast
        title="Hourly Forecast"
        weather={weather}
        units={units}
        selectedUnitText={selectedUnitText}
      />
      {/* <Forecast title="Daily Forecast" weather={weather} /> */}
    </div>
  );
}

export default App;
