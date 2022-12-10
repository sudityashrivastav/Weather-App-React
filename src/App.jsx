import './App.css';
import { useEffect, useState } from "react";

export default function App() {
  const [dataTemp, setDataTemp] = useState("");
  const [searchValue, setSearchValue] = useState("lucknow");
  const [weatherIcon, setWeatherIcon] = useState("moon-outline");
  const [update, setUpdate] = useState("suditya");

  const checkData = async () => {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=0065f9f77a5885ae0ce695e8aa5018ad`;

    let res = await fetch(url);
    let data = await res.json();
    const { temp, humidity, pressure } = data.main;
    const { name, visibility } = data;
    const { main: wCondition } = data.weather[0];
    const { speed } = data.wind;

    const sk = {
      temp,
      name,
      humidity,
      visibility,
      wCondition,
      pressure,
      speed,
    };
    setDataTemp(sk);
  }
  useEffect(() => {
    checkData();
  }, []);

  const knowMore = (dat) => {
    setSearchValue(dat);
  }

  useEffect(() => {
    if (dataTemp.wCondition) {
      switch (dataTemp.wCondition) {
        case "Rain": setWeatherIcon("rainy-outline");
          break;
        case "Clear": setWeatherIcon("sunny-outline");
          break;
        case "Thunderstorm": setWeatherIcon("thunderstorm");
          break;
        case "Mist": setWeatherIcon("sunny-outline");
          break;
        case "Clouds": setWeatherIcon("cloud");
          setUpdate("containerNight");
          break;
        default: setWeatherIcon("sunny-outline");
          break;
      }
    }
  }, [dataTemp.wCondition]);

  return (
    <div className="container">
      <div className="search">
        <input type="search" placeholder="Search any location.."
          onChange={(e) => knowMore(e.target.value)}
        ></input>
        <button className="searchButton" onClick={checkData}>

          <ion-icon name="search-outline"></ion-icon>

        </button>
      </div>
      <div className="upperSection">

        <div className="icon">
          <ion-icon name={weatherIcon}></ion-icon>
          <p className="temp">{parseInt(dataTemp.temp)}&deg;</p>
        </div>
        <div className="icon">
          <div className="middleSection">
            <p className="location">{dataTemp.name}</p>
            <p className="weatherCondition">{dataTemp.wCondition}</p>
          </div>
        </div>
      </div>

      <div className="icon">
        <div className="lowerSection">
          <div className="humiSection">
            <p className="humiValue">{dataTemp.humidity}</p>
            <p className="humidity">Humidity</p>
          </div>
          <div className="visibleSection">
            <p className="visibleValue">{dataTemp.speed}</p>
            <p className="visibility">Speed</p>
          </div>
          <div className="unknownSection">
            <p className="unknownValue">{dataTemp.pressure}</p>
            <p className="unknown">Pressure</p>
          </div>

        </div>
      </div>
    </div>
  )

}