import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GuessGame from './GuessGame.jsx';
import LoveReward from './LoveReward.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<GuessGame />} />
        <Route path="/love" element={<LoveReward />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);