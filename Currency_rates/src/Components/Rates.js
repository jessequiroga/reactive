import React, { Component } from 'react';
import './Rates.css';
import axios from 'axios';
import Currency from './Currency'


class Rates extends Component {

        constructor(props) {
            super(props);
            this.state = {
                data: [{
                        base: "GBP",
                        date: "",
                        time_last_updated: "",
                        rates: [],
                },
                {
                        base: "EUR",
                        date: "",
                        time_last_updated: "",
                        rates: [],
                },
                {
                        base: "USD",
                        date: "",
                        time_last_updated: "",
                        rates: [],
                },
                ]
            };
        }

        fetchCurrencyData() {
        var result_array = [];
        var arr_cur = ['GBP', 'EUR', 'USD'];
        for (var i = 0; i < arr_cur.length; i++){
        axios('https://api.exchangerate-api.com/v4/latest/' + arr_cur[i])
        .then((response) => { 
                var result = response.data;
                var result_rates = [];
                result_rates.push(result.rates.GBP);   // replace received data with necessary currency
                result_rates.push(result.rates.EUR);
                result_rates.push(result.rates.USD);
                result.rates = result_rates;
                result_rates = [];
                result.time_last_updated = String(result.time_last_updated);   // make time look better
                result.time_last_updated = result.time_last_updated.slice(0,2) + ':' + result.time_last_updated.slice(2,4) + ':' + result.time_last_updated.slice(4,6);
                result_array.push(result);    // make array out of object to use 'map' later
                var data_arrays = this.state.data;  // clone current state
                for (var j = 0; j < result_array.length; j++){
                data_arrays[j] = result_array[j];   // update cloned state
                }
                this.setState({data: data_arrays});  // update original state

            })
            .catch(err => console.log(err));
        }
    }

        componentDidMount() {
            
        this.fetchCurrencyData();
        this.interval = setInterval(() => this.fetchCurrencyData(), 60 * 1000);
        }

        render() {
            var rates = this.state.data.map((currency) =>
        <Currency data={currency} key={currency.base} />
            );
            return (
                <div className="rates-container">
                    <ul className="rates">{rates}</ul>
                    <p></p>
               </div>
            );
        }
    }

    export default Rates;