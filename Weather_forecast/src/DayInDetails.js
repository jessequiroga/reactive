import React, { Component } from 'react';
import './DayInDetails.css';

class DayInDetails extends Component {

        render() {
            var {
                time,
                symbol,
                temperature,
            } = this.props.data;
            return (
                <li className={"Weather-day " + time}>
                    <p className="Weather-date">{time}</p>
                    <p className="Weather-symbol"><img src={symbol} alt="symbol"/></p>
                    <p className="Weather-temperature">{temperature}</p>
                </li>
            );
        }
    }

export default DayInDetails;

