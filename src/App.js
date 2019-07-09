// @flow
import React from 'react';
import './App.css';
// import styled from "@emotion/styled";
import socketIOClient from 'socket.io-client';

import SlideController from './components/Remote';
import PointerController from './components/PointerController';

type DeviceOrientationEvent = {
  alpha: number,
  beta: number,
  gamma: number,
  absolute: boolean,
};

type State = {
  alpha: ?number,
  beta: ?number,
  gamma: ?number,
  currentIndex: number,
  isPointerDisplayed: boolean,
};

class App extends React.Component<*, State> {
  state = {
    alpha: null,
    beta: null,
    gamma: null,
    currentIndex: 0,
    isPointerDisplayed: false,
  };

  endpoint = '/remote';
  socket = socketIOClient(this.endpoint);

  componentDidMount() {
    window.addEventListener('deviceorientation', this.handleOrientation);
    this.socket.emit('slideIndex', {
      index: 0,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('deviceorientation', this.handleOrientation);
  }

  handleOrientation = (event: DeviceOrientationEvent) => {
    const { alpha, beta, gamma } = event;
    this.socket.emit('position', {
      alpha: alpha.toFixed(2),
      beta: beta.toFixed(2),
      gamma: gamma.toFixed(2),
    });

    this.setState({
      alpha,
      beta,
      gamma,
    });
  };

  requestIndex = (index: number) => {
    this.setState({
      currentIndex: index,
    });
    this.socket.emit('slideIndex', {
      index: index,
    });
  };

  displayPointer = (display: boolean) => {
    this.socket.emit('displayPointer', {
      display: display,
    });
    this.setState({
      isPointerDisplayed: display,
    });
    console.log(display);
  };

  render() {
    const { currentIndex } = this.state;
    return (
      <div className="App">
        <SlideController
          requestIndex={this.requestIndex}
          currentIndex={currentIndex}
        />
        <PointerController displayPointer={this.displayPointer} />
      </div>
    );
  }
}

export default App;
