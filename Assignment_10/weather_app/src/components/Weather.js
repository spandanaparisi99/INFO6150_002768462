import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import DailyWeather from "./DailyWeather";
import { TextField } from "@material-ui/core";
import axios from "axios";
import moment from "moment";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: localStorage.getItem("city") || "",
      zipcode: "02215",
      country: "USA",
      latitude: "",
      longitude: "",
      weatherData: {},
      location: {},
    };
  }

  componentDidMount() {
    if (this.state.city) {
      this.getWeatherData();
    }
  }

  getWeatherData = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=imperial&appid=1e07fdb207d0902dbcc968a89a6e21e4`
      )
      .then((res) => {
        const weatherData = res?.data?.list;
        localStorage.setItem("location", JSON.stringify(res?.data?.city));
        localStorage.setItem("city", this.state.city);
        this.setState({ weatherData, city: this.state.city });
      })
      .catch((err) => {
        alert("Please enter correct city");
        this.setState({ weatherData: {} });
      });
  };

  searchCity = (event) => {
    event.preventDefault();
    this.getWeatherData();
  };

  handleChange = ({ target }) => {
    this.setState({
      city: target.value,
    });
  };

  onClickHandler = (obj) => {
    let newDate = new Date();
    const weekday = obj.dt * 1000;
    newDate.setTime(weekday);
    const date = obj.dt_txt.split(" ")[0];
    const data = this.state.weatherData?.filter((data) =>
      data.dt_txt.includes(date)
    );

    localStorage.setItem("dailyWeather", JSON.stringify(data));
    localStorage.setItem("currentDailyWeather", JSON.stringify(obj));
    this.props.history.push(`dailyWeather/${moment(newDate).format("dddd")}`);
  };

  render() {
    let isWeather = false;
    const card = [];
    if (this.state.weatherData.length) {
      const data = [];
      const map = new Map();

      for (const item of this.state.weatherData) {
        if (!map.has(item.dt_txt.split(" ")[0].split("-")[2])) {
          map.set(item.dt_txt.split(" ")[0].split("-")[2], true);
          data.push(item);
        }
      }

      console.log(data);
      localStorage.setItem("fullData", JSON.stringify(data));
      isWeather = true;
      const abcData = data.map((obj, i) => {
        const newDate = new Date(obj.dt_txt);
        const imgURL = `owf owf-${obj.weather[0].id} owf-5x`;
        const dailyData = this.state.weatherData.filter(
          (data) => data.dt_txt.split(" ")[0] === obj.dt_txt.split(" ")[0]
        );
        const highestTemp = Math.max(
          ...dailyData.map((item) => item.main.temp)
        );
        const lowestTemp = Math.min(...dailyData.map((item) => item.main.temp));
        card.push(
          <div
            className="weather card"
            key={`main_${i}`}
            onClick={() => {
              this.onClickHandler(obj);
            }}
          >
            <h3 className="card-title" key={`h3_${i}`}>
              {moment(newDate).format("dddd")}
            </h3>
            <p className="text-muted" key={`p_${i}`}>
              {moment(newDate).format("MMMM Do")}
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <i className={imgURL} key={`i_${i}`}></i>
              <h2 key={`h2_${i}`} style={{ margin: "auto 5px" }}>
                {Math.round(obj.main.temp)}
                <sup>°F</sup>
              </h2>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h2
                key={`h6_${i}`}
                style={{ margin: "auto 5px", color: "#bababa" }}
              >
                {Math.round(highestTemp)}
                <sup>°F</sup>
              </h2>
              <h2
                key={`h7_${i}`}
                style={{ margin: "auto 5px", color: "#bababa" }}
              >
                {Math.round(lowestTemp)}
                <sup>°F</sup>
              </h2>
            </div>
            <div className="card-body" key={`card_${i}`}>
              <p className="card-text" key={`pdesc_${i}`}>
                {obj.weather[0].description}
              </p>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="weather">
        <div
          style={{ display: this.state.weatherData.length ? "flex" : "block" }}
        >
          <div
            className="leftbg"
            style={{ width: this.state.weatherData.length ? "20%" : "100%" }}
          >
            <div className="SearchBarChilds">
              {!this.state.weatherData.length ? (
                <h1 className="header-title">Weather Forecast App</h1>
              ) : null}
              <h2 className="text-white">Enter city</h2>
              <form onSubmit={this.searchCity}>
                <TextField
                  variant="outlined"
                  defaultValue={this.state.city}
                  value={this.state.city}
                  type="text"
                  onChange={this.handleChange}
                  name="city"
                  id="inputSearchCity"
                  placeholder="Search"
                  InputLabelProps={{ shrink: true }}
                  style={{ background: "white", borderRadius: 8, width: "82%" }}
                />
                <input
                  className="submitButton"
                  type="submit"
                  value="Submit"
                  style={{ margin: "10px" }}
                />
              </form>
            </div>
          </div>
          {this.state.weatherData.length ? (
            <div
              className="rightbg"
              style={{ width: this.state.weatherData.length ? "80%" : "0%" }}
            >
              <h1 className="header-title">Weather Forecast App</h1>
              <div style={{ display: "flex" }}>
                {isWeather && (
                  <div className="card-deck">{card.length && card}</div>
                )}
              </div>
            </div>
          ) : null}
        </div>
        <Switch>
          <Route
            path="/dailyWeather/:day"
            render={(props) => <DailyWeather {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Weather;
