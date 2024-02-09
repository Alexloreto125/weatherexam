import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Forecast = ({ title, weather }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
  };
  const [dataW, setDataW] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${weather.city}&units=metric&appid=a618d41fd67b6d6ea1d4eb93b15050af&lang=it`
        );
        if (!response.ok) {
          throw new Error("Errore nella richiesta API");
        }

        const data = await response.json();
        console.log(data);

        setDataW(
          data.list.map((item) => ({
            temp: item.main.temp,
            city: weather.city,
            time: item.dt_txt,
            icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [weather.city]);

  return (
    <Container style={{ maxWidth: "1080px" }}>
      <Row
        className="mx-auto text-center text-white rounded-bottom"
        style={{ backgroundColor: "#3B6FAB" }}
      >
        <h5 className="ms-5">{title}</h5>

        <Slider {...settings}>
          {dataW.map((data, index) => (
            <Col
              className="ms-5 mt-2"
              style={{ width: "120px", textAlign: "center" }}
            >
              <Col>
                <span>
                  {weather.city} {data.time.slice(11, 16)}
                </span>
              </Col>
              <img src={data.icon} alt="logo" style={{ width: "50px" }} />
              <h5>{data.temp} °C</h5>
            </Col>
          ))}
        </Slider>
      </Row>
    </Container>
  );
};
export default Forecast;
