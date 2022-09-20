import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CustomKeycloack, CustomKeycloakProvider } from './modules';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <CustomKeycloakProvider>
      <div className="App">
        <button onClick={() => CustomKeycloack.logout()}>Log Out</button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </CustomKeycloakProvider>
  );
}

export default App;
