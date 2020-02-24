import React, { Component } from 'react';
import './Metronome.css';
import click1 from './audio/click1.mp3';
import click2 from './audio/click2.mp3';

class Metronome extends Component {
	constructor(props) {
    super(props);
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    this.state = {
      playing: false,
      count: 0,
      beatsPerMinute: 100,
      beatsPerMeasure: 1
    };
  }
  	
  	handleBeatsPerMinuteChange = event => {
    const beatsPerMinute = event.target.value;

    if (this.state.playing) {
    // Stop the old timer and start a new one
    clearInterval(this.timer);
    console.log('reset minute');
    this.timer = setInterval(this.playClick, (60 / beatsPerMinute) * 1000);

    // Set the new BPM, and reset the beat counter
    this.setState({
      count: 0,
      beatsPerMinute: beatsPerMinute
    });
  } else {
    // Otherwise just update the BPM
    this.setState({ beatsPerMinute });
  }
  }

  handleBeatsPerMeasureChange = event => {
    const beatsPerMeasure = event.target.value;

    if (this.state.playing) {
    // Stop the old timer and start a new one
    clearInterval(this.timer);
    this.timer = setInterval(this.playClick, (60 / this.state.beatsPerMinute) * 1000);
    // Set the new BPM, and reset the beat counter
    this.setState({
      count: 0,
      beatsPerMeasure: beatsPerMeasure
    });
  } else {
    // Otherwise just update the BPM
    this.setState({ beatsPerMeasure });
  }
  }
  	
  	startMetronome = () => {
  if (this.state.playing) {
    // Stop the timer
    clearInterval(this.timer);
    this.setState({
      playing: false
    });
  } else {
    // Start a timer with the current BPM
    this.timer = setInterval(
      this.playClick,
      (60 / this.state.beatsPerMinute) * 1000
    );
    this.setState(
      {
        count: 0,
        playing: true
        // Play a click "immediately" (after setState finishes)
      },
      this.playClick
    );
  }
};

	playClick = () => {
  const { count, beatsPerMeasure } = this.state;

  // The first beat will have a different sound than the others
  if (count % beatsPerMeasure === 0) {
    this.click1.currentTime = 0;
    this.click2.play();
  } else {
  	this.click1.currentTime = 0;
    this.click1.play();
  }

  // Keep track of which beat we're on
  this.setState(state => ({
    count: (state.count + 1)
  }));
};

  render() {
  	let { playing, beatsPerMinute, beatsPerMeasure } = this.state;

    return <div className="metronome">
    	<div className='bpm'>
    		<div className='bpm-value'>{beatsPerMinute} Beats Per Minute</div>
    		<input type="range" min="60" max="240" value={beatsPerMinute} onChange={this.handleBeatsPerMinuteChange}/>

    		<div className='bpm-value'>{beatsPerMeasure} Beats Per Measure</div>
    		<input type="range" min="1" max="24" value={beatsPerMeasure} onChange={this.handleBeatsPerMeasureChange}/>
    	</div>
    	<button className="playing" onClick={this.startMetronome}>{playing ? 'Stop' : 'Start'}</button>
    </div>;
  }
}

export default Metronome;