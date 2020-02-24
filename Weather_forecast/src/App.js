import React, { Component } from 'react';
import './App.css';
import Days from './Days';


class App extends Component {
  constructor(props) {
            super(props);
            this.state = {
  };
  }

  render() {
    var header = 'Weather forecast';
    var subheader = '(Click the day to get details)'
    return (
      <div className="App">
      <header className="App-header">{header}</header>
      <header className="App-subheader">{subheader}</header>
      <Days />
      </div>
            );
        }
    }

    export default App;