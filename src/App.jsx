import React, { useState, useEffect, useRef } from "react";
import bgImage from './assets/bg-2.jpg'
import messages from "./messages";
import yadTrack from './assets/yadTrack.mp3';
import { Link } from 'react-router-dom';

export default function App() {
  const [msg, setMsg] = useState("🌒 Tap the flame to reveal your secret whisper...");
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(err => console.log("Autoplay blocked", err));
    }
  }, []);

  const showRandomMessage = () => {
    const idx = Math.floor(Math.random() * messages.length);
    setMsg(messages[idx]);

    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.play().catch(err => console.log("Audio play error", err));
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white p-6 animate-fadeIn"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-500 to-purple-500 drop-shadow-xl mb-10 tracking-wide animate-slideUp">
         Lemme whisper the love ,i've for you✨!
      </h1>

      <div className="backdrop-blur-md bg-black/60 border border-red-700 p-8 md:p-10 rounded-3xl shadow-2xl max-w-2xl text-center transition-all duration-500 hover:shadow-red-800 animate-scaleIn">
        <p className="text-xl md:text-2xl font-light italic text-red-100 mb-6 transition-all duration-300 animate-fadeIn">
          {msg}
        </p>
        <button
          onClick={showRandomMessage}
          className="animate-pulseOnce px-6 py-3 bg-red-900 hover:bg-red-700 rounded-full font-medium tracking-wide transition-all duration-300 italic"
          style={{ fontFamily: `'Georgia', serif` }}
        >
          One more whisper ? <span className="animate-pulse inline-block">🔥</span>
        </button>

        {/* 🔊 Music Toggle */}
        <button
    onClick={toggleMusic}
    className="text-sm text-red-400 hover:text-red-200 transition-all font-mono"
  >
    {isPlaying ? '🔇 Pause Music' : '🔊 Play Music'}
  </button>
</div>
      <p className="mt-6 text-sm italic">
        <Link
          to="/game"
          className="text-transparent font-semibold tracking-wide bg-clip-text bg-gradient-to-r from-red-800 via-red-600 to-red-500 hover:from-red-700 hover:to-red-400 transition-all"
          style={{ fontFamily: `'Georgia', serif` }}
        >
          Let’s play a game❤️?
        </Link>
      </p>

      <audio ref={audioRef} src={yadTrack} loop className="hidden" />
    </div>
  );
}
