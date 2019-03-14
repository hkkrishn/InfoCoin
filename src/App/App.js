import React, { Component } from 'react';
import './App.css';
import Welcome from './WelcomeMessage'
import AppLayout from './AppLayout';
import styled,{css} from 'styled-components';

class App extends Component {
  render() {
    return (
      <AppLayout>
        <Welcome name={"Bitcoin"}/>
      </AppLayout>
      
      
    );
  }
}

export default App;
