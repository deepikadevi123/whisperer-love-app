import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from './assets/bg-7.jpg';
import yadTrack1 from './assets/yadTrack1.mp3';

export default function GuessGame() {
  const [guess, setGuess] = useState('');
  const [response, setResponse] = useState('');
  const [wrongTries, setWrongTries] = useState(0);
  const [guessHistory, setGuessHistory] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true); // ✅ new
  const navigate = useNavigate();
  const audioRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((err) => console.log("Autoplay blocked", err));
    }
  }, []);

  // ✅ Toggle music playback
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.log("Audio play error", err));
    }

    setIsPlaying(!isPlaying);
  };

  const customResponses = [
    // 👉 Keep your full customResponses array here...
  ];

  const handleGuess = () => {
    const trimmed = guess.trim().toLowerCase();

    if (trimmed === "infinity" || trimmed === "∞") {
      localStorage.setItem("secretWrongTries", wrongTries);
      localStorage.setItem("secretGuessHistory", JSON.stringify(guessHistory));
      navigate('/love');
      return;
    }

    const num = parseInt(trimmed);

    if (isNaN(num)) {
      setResponse("Baby, enter a number huh?? 😉");
      setWrongTries((prev) => prev + 1);
      setGuessHistory((prev) => [...prev, trimmed]);
    } else if (customResponses.some(r => r.startsWith(`${num}?`))) {
      const match = customResponses.find(r => r.startsWith(`${num}?`));
      setResponse(match);
      setWrongTries((prev) => prev + 1);
      setGuessHistory((prev) => [...prev, num]);
    } else {
      const randomResponse = customResponses.find(r => !/^\d+\?/.test(r));
      setResponse(`${num}? ${randomResponse}`);
      setWrongTries((prev) => prev + 1);
      setGuessHistory((prev) => [...prev, num]);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white p-6 animate-fadeIn"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h1 className="text-5xl md:text-6xl font-bold text-red-500 drop-shadow-md mb-8 tracking-wide font-serif animate-slideUp">
        Guess How Much I Love You ?
      </h1>

      <div className="bg-black/60 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl max-w-xl w-full text-center border border-red-700 transition-all animate-scaleIn">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Guess the weight of my love .."
          className="w-full p-4 mb-5 rounded-xl text-black font-medium text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
          <button
            onClick={handleGuess}
            className="bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 px-8 py-3 rounded-full text-white font-bold tracking-wide shadow-lg transition-transform hover:scale-105"
          >
            Submit Guess, My LOVE 😈?
          </button>

          <button
            onClick={toggleMusic}
            className="text-sm text-red-400 hover:text-red-200 transition-all font-mono"
          >
            {isPlaying ? '🔇 Pause Music' : '🔊 Play Music'}
          </button>
        </div>

        {response && (
          <p className="mt-6 text-pink-200 italic text-lg animate-fadeInSlow">
            {response}
          </p>
        )}
      </div>

      <audio ref={audioRef} src={yadTrack1} loop className="hidden" />
    </div>
  );
}
