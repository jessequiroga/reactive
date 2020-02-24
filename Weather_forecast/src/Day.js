import React, { Component } from 'react';
import './Day.css';

class Day extends Component {

        render() {
            var {
                date,
                symbol,
                temperature,
            } = this.props.data;
            return (
                <li className={"Weather-day " + date} onClick={() => this.props.onClick()}>
                    <p className="Weather-date">{date}</p>
                    <p className="Weather-symbol"><img src={symbol} alt="symbol"/></p>
                    <p className="Weather-temperature">{temperature}</p>
                </li>
            );
        }
    }

export default Day;

