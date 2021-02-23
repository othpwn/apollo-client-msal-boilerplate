import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

console.log(process.env)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);