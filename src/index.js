import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as ReactService from './ReactServices';

ReactDOM.render(<App />, document.getElementById('root'));

ReactService.unregister();
