import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNt2R7mw3I6ZuhFln0N8mTIT0fKRPy_NU",
  authDomain: "chatapp-ffab6.firebaseapp.com",
  databaseURL: "https://chatapp-ffab6-default-rtdb.firebaseio.com",
  projectId: "chatapp-ffab6",
  storageBucket: "chatapp-ffab6.appspot.com",
  messagingSenderId: "809908678913",
  appId: "1:809908678913:web:30fb4780efe20fe714ab00",
  measurementId: "G-0MNFLC8PXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
