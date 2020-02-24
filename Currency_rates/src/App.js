import React, { Component } from 'react';
import './App.css';
import Rates from './Components/Rates.js';


class App extends Component {
  render() {
    return (
              <div className="App">
                  <div className="App-header">
                        <h2>Currency Rates</h2>
                  </div>
                  <Rates />
                </div>
            );
        }
    }

    export default App;