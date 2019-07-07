// @flow
import React from 'react';
import './App.css';
import styled from '@emotion/styled';
import socketIOClient from 'socket.io-client';

import Remote from './components/Remote';

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
};

class App extends React.Component<*, State> {
  state = {
    alpha: null,
    beta: null,
    gamma: null,
    currentIndex: 0,
  };

  endpoint = '/remote';
  // endpoint = 'https://172.20.10.7:3001/remote';
  socket = socketIOClient(this.endpoint);

  componentDidMount() {
    window.addEventListener('deviceorientation', this.handleOrientation);
    //this.socket.on('message', data => this.setState({response: data}));
    this.socket.emit('slideIndex', {
      index: 0,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('deviceorientation', this.handleOrientation);
  }

  handleOrientation = (event: DeviceOrientationEvent) => {
    const {alpha, beta, gamma} = event;

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

  render() {
    const {alpha, beta, gamma, currentIndex} = this.state;
    //console.log(response);
    return (
      <div className="App">
        <Remote requestIndex={this.requestIndex} currentIndex={currentIndex} />
        <Container>
          <span>alpha: {alpha && alpha.toFixed(2)}</span>
          <span>beta: {beta && beta.toFixed(2)}</span>
          <span>gamma: {gamma && gamma.toFixed(2)}</span>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default App;
