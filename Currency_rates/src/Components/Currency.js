import React, { Component } from 'react';
import './Currency.css';

class Currency extends Component {

        render() {
            var {
                base,
                date,
                time_last_updated,
                rates,
            } = this.props.data;
            return (
                <li className={"currency " + base}>
                    <p className="currency-name">Name: {base}</p>
                    <p>Updated: {date} {time_last_updated}</p>
                    <p className="gbp">GBP: {rates[0]}</p>
                    <p className="eur">EUR: {rates[1]}</p>
                    <p className="usd">USD: {rates[2]}</p>
                </li>
            );
        }
    }

    export default Currency;

