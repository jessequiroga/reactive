import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './Days.css';
import Day from './Day';
import DayInDetails from './DayInDetails'

class Days extends Component {
  constructor(props) {
            super(props);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                data: [{
                        date: "Day_1",
                        symbol: "Symbol",
                        temperature: 'Temp',
                },
                  {
                        date: "Day_2",
                        symbol: "Symbol",
                        temperature: 'Temp',
                },
                {
                        date: "Day_3",
                        symbol: "Symbol",
                        temperature: 'Temp',
                },
                {
                        date: "Day_4",
                        symbol: "Symbol",
                        temperature: 'Temp',
                },
                {
                        date: "Day_5",
                        symbol: "Symbol",
                        temperature: 'Temp',
                },
                ],
                detailedData: [{
                    date: "Day",
                    symbol: "Symbol",
                    temperature: 'Temp',
                    time: "Time",
                },
                ],
                isDetailed: false, // to show detailed information
                fullWeather: '',  // save time and all data at once
                city: '',
            };
        }

   fetchWeather() {
        var results = [];
        var lat = '';
        var lon = '';
        var url = '';
        var city = this.state.city;
        let geo = require('./geo.json');  // import file with coordinates
        lat = geo[city][0];
        lon = geo[city][1];
        url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&APPID=47246b58dee8b9eba96fa2308e7d54e2";
        axios(url)
        .then((response) => { 
                var result = response.data;
                // get 3 values from result
                console.log(result);
                results = result.list.map(function(day){
                        return {date: formatDate(day.dt_txt),
                                symbol: formatIcon(day.weather[0].icon),
                                temperature: formatTemp(day.main.temp),
                                time: formatTime(day.dt_txt),
                                }
                    });
                this.setState({fullWeather: results})  // save detailed results
                function formatDate(date){
                        // return month and day
                        return date.slice(8, 10) + '.' + date.slice(5, 7);
                }

                function formatIcon(icon){
                     // return icon image
                    var icon_url = 'http://openweathermap.org/img/w/';
                    return icon_url + icon + '.png'
                }

                function formatTemp(temp){
                     // return celcium results
                    return (temp - 273.15).toFixed(1) + ' C';
                }

                function formatTime(date){
                    // return time
                    return date.slice(11, 16);
                }

                // write received values to state
                var five_results = []
                for (var i = 0; i < results.length; i += 8){  // return 5 results
                    five_results.push(results[i]);
                }
                this.setState({data: five_results})
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        var weatherContainer = ReactDOM.findDOMNode(this.refs.weather);  // get div with weather information
        var cityNotFoundContainer = ReactDOM.findDOMNode(this.refs.cityNotFound);  // get div with no found message
        if (this.state.city === ''){  // hide everything at start
            weatherContainer.style.visibility='hidden';
            cityNotFoundContainer.style.visibility = "hidden";
        }
    };

    componentDidUpdate(prevProps, prevState) {
   var weatherContainer = ReactDOM.findDOMNode(this.refs.weather);
   var cityNotFoundContainer = ReactDOM.findDOMNode(this.refs.cityNotFound);
    if (this.state.city !== prevState.city) {   // if city was changed
        var city = this.state.city;
        let geo = require('./geo.json'); 
        if (city in geo){     // find coordinates
    cityNotFoundContainer.style.visibility = "hidden";   // hide error message
    weatherContainer.style.visibility = 'visible';  // display weather
    this.fetchWeather();
    this.interval = setInterval(() => this.fetchWeather(), 300000);  // weather update every 5 minutes
    }
     else{   // hide weather, display error
        weatherContainer.style.visibility = 'hidden';
        cityNotFoundContainer.style.visibility = "visible";
        cityNotFoundContainer.innerHTML = "Sorry, your city wasn't found. Maybe you should check your typing";
    }
}
}

    onDayClick(date) {
      var resultsDetailed = this.state.fullWeather.filter(function(day){
                        return day.date === date;   // return forecast for clicked day
                    });
      this.setState({detailedData: resultsDetailed, isDetailed: true});
    };

    handleSubmit(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();        
    this.setState({city: text});
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

   render() {
   var days = this.state.data.map((day) => 
        <Day data={day} key={day.date} onClick={() => this.onDayClick(day.date)}/>
            );
   if (this.state.isDetailed){
   var detailedDays = this.state.detailedData.map((dayData) => 
        <DayInDetails data={dayData} key={dayData.time} />
            );
    }
  return (
    <div className="container">
    <div className="city-input">
    <form className="city" onSubmit={this.handleSubmit} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type your city and press enter"
              />
            </form> 
        </div>
        <div className='cityNotFound' ref="cityNotFound"></div>
        <div className="Weather-container" ref="weather">
        <div className="city-name">{this.state.city}</div>   
      <ul className="Weather-days">{days}
      </ul>
       <ul className="Weather-hours">{this.state.isDetailed ? detailedDays : false}
      </ul>
      </div>
      </div>
  );
}
}

export default Days;
