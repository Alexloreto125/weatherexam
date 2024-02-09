import { useEffect, useState } from "react";
import { Col, FormGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { WiHumidity } from "react-icons/wi";
import { GiWhirlwind } from "react-icons/gi";
import { RiCelsiusLine } from "react-icons/ri";
import { RiFahrenheitLine } from "react-icons/ri";
import { FaSearchLocation } from "react-icons/fa";
//<FaSearchLocation />
import { FaLocationArrow } from "react-icons/fa6";
//<FaLocationArrow />
import "./style.css";

const NavbarComponents = ({
  weather,
  setWeather,
  units,
  setUnits,
  selectedUnitText,
  setSelectedUnitText,
  handleUnitChange,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const cities = [
    {
      id: 1,
      city: "Corea",
    },
    {
      id: 2,
      city: "Corea",
    },
    {
      id: 3,
      city: "Corea",
    },
  ];
  const handleSearch = (e) => {
    e.preventDefault();
    let city = e.target.city.value;
    if (!city) {
      alert("Inserisci un nome di una città valido!");
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=a618d41fd67b6d6ea1d4eb93b15050af&lang=it` //
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data.weather[0].icon);
        setWeather({
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          temp: data.main.temp,
          city: data.name,
          humidity: data.main.humidity,
          speed: data.wind.speed,
        });
      })
      .catch((e) => {
        return Error(e);
      });
  };

  return (
    <Container className=" mt-2" style={{ maxWidth: "1080px" }}>
      <Row
        className="mx-auto rounded-top text-center text-white "
        style={{ backgroundColor: "#3B6FAB" }}
      >
        <Col xs={12}>
          <h1 className="fw-bold mb-5">Weather Forecast</h1>

          {cities.map((city) => (
            <Button className="me-5 mb-2 text-white fw-bold" variant="outlined">
              {city.city}
            </Button>
          ))}

          <Form
            className="d-flex mb-3 justify-content-center"
            onSubmit={handleSearch}
          >
            <Form.Control
              placeholder="Città"
              className="me-2"
              name="city"
              style={{ width: "300px" }}
            />
            <Button
              type="submit"
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "inherit",
              }}
            >
              <FaSearchLocation />
            </Button>{" "}
            <Button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "inherit",
              }}
            >
              <FaLocationArrow />
            </Button>{" "}
            <FormGroup className="d-flex align-items-center  ">
              <Button
                type="submit"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: units === "metric" ? "inherit" : "gray",
                }}
                onClick={() => handleUnitChange("metric")}
              >
                <RiCelsiusLine />
              </Button>{" "}
              |
              <Button
                type="submit"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: units === "imperial" ? "inherit" : "gray",
                }}
                onClick={() => handleUnitChange("imperial")}
              >
                <RiFahrenheitLine />
              </Button>{" "}
            </FormGroup>
          </Form>
          <div>LOCATION AND TIME</div>
          <p>
            {weather.city} : {currentDateTime.toLocaleString()}
          </p>
          <img src={weather.icon} alt="logo" />
          <h1 className="display-4 fw-medium">
            {weather.temp} {selectedUnitText}
          </h1>
          <h1 className="mb-5">{weather.city}</h1>
        </Col>
        <Row className="mb-3">
          {" "}
          <Col xs={12} md={6}>
            <WiHumidity />
            <p>{weather.humidity} %</p>
          </Col>
          <Col xs={12} md={6}>
            <GiWhirlwind />
            <p>{weather.speed} km/h</p>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};
export default NavbarComponents;

/// a618d41fd67b6d6ea1d4eb93b15050af API
//
