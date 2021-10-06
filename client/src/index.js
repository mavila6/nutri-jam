import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import ThemeProvider from "./context/ThemeContext/ThemeProvider"
import App from './App';

ReactDOM.render(
  // <ThemeProvider>
    <App />,
  // </ThemeProvider>
  document.getElementById('root')
);
