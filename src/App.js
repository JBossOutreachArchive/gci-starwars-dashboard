import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="dashHead">
           <b> git </b>
        </p>
      </header>
      <hr/>
      <br/>
      <p className="head">
        <b style={{textAlign:"center"}}>Repo: {localStorage.getItem('repoName')}</b>
      </p>
      <MainPage/>
    </div>
  );
}

export default App;
