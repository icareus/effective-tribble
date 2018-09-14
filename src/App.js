import React, { Component } from 'react';
import './App.css';
import Map from './components/Map'
import Overlay from './components/Overlay'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Overlay>
          <div>Hello Test !</div>
        </Overlay>
        <Map />
      </div>
    );
  }
}

export default App;
