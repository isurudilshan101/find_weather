import React, { useState } from "react";
import "./WeatherUIStyle.css";
import axios from "axios";

const WeatherUI = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("key press");
      setWeatherData(null);
      setError(null);
      fetchWeatherData();
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=33c92b0552e0eea71460739025382726`
      );

      console.log("RESPONSE Data", response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.log("error", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="heading_container">
        <h1 className="">Weather App</h1>
      </div>
      <div className="app_container">
        <div className="app">
          <div className="form_container">
            <input
              type="text"
              value={latitude}
              onChange={(e) => {
                setLatitude(e.target.value);
              }}
              placeholder="Latitude"
              required
            />
            <input
              type="text"
              value={longitude}
              onChange={(e) => {
                setLongitude(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              placeholder="Longitude"
              required
            />
          </div>
          {error && !weatherData && (
            <div className="error_message">{error && <p>{error}</p>}</div>
          )}
          <br></br>
          <div className="hori_line">
            <hr></hr>
          </div>
          {weatherData && (
            <>
              <div className="city_name_and_date">
                <div className="city_name">
                  {weatherData.name}, {weatherData.sys.country}
                </div>
                <div className="weather_date">
                  {" "}
                  <div>
                    {new Date(weatherData.dt * 1000).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                      }
                    )}
                  </div>
                </div>
              </div>

              {/* mobi responsive */}

              <div className="city_name_and_date_mobi">
                <div className="city_name_and_date_mobi_left">
                  <div className="city_name_mobi">
                    {weatherData.name}, {weatherData.sys.country}
                  </div>
                  <div className="weather_date_mobi">
                    {" "}
                    <div>
                      {new Date(weatherData.dt * 1000).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          day: "2-digit",
                          month: "long",
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* image area mobi */}

              <div className="image_tem_type_mobi">
                <div>
                  <div className="weather_image_mobi">
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt="weather_image"
                    />
                  </div>
                  <div className="temp_and_temp_type_mobi">
                    <div className="temparature_mobi">
                      {weatherData.main.temp}°
                    </div>
                    <div className="temparature_type_mobi">
                      {weatherData.weather[0].main}
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================== */}
              <div className="details_container">
                <div className="left_side">
                  <div className="weather_image">
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt="weather_image"
                    />
                  </div>
                  <div className="temp_and_temp_type">
                    <div className="temparature">{weatherData.main.temp}°</div>
                    <div className="temparature_type">
                      {weatherData.weather[0].main}
                    </div>
                  </div>
                </div>

                <div className="right_side">
                  <div className="column1">
                    <b>{weatherData.main.temp_max}° </b>
                    <br></br>
                    <span>High</span>
                  </div>

                  <div className="column2">
                    <b>{weatherData.wind.speed} mph</b>
                    <br></br>
                    <span>Wind</span>
                  </div>

                  <div className="column3">
                    <b>
                      {new Date(
                        weatherData.sys.sunrise * 1000
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </b>

                    <br></br>
                    <span>Sun rise</span>
                  </div>

                  <div className="column4">
                    <b>{weatherData.main.temp_min}° </b>
                    <br></br>
                    <span>Low</span>
                  </div>

                  <div className="column5">
                    <b>{weatherData.clouds.all} % </b>
                    <br></br>
                    <span>Rain</span>
                  </div>

                  <div className="column6">
                    <b>
                      {weatherData &&
                        new Date(
                          weatherData.sys.sunset * 1000
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                    </b>

                    <br></br>
                    <span>Sun set</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* app */}
        </div>
      </div>
    </div>
  );
};

export default WeatherUI;
