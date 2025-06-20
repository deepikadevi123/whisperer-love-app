import React, { useEffect, useRef, useState } from 'react';
import bgImg from './assets/bg9.jpg';
import boyfriend from './assets/boyfriend.mp3';

export default function LoveReward() {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((err) => console.log("Autoplay blocked", err));
    }
  }, []);

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

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white p-6 text-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h1
        className="text-5xl md:text-6xl font-extrabold tracking-wide text-center mb-10 animate-slideUp"
        style={{
          fontFamily: `'Cormorant Garamond', serif`,
          background: 'linear-gradient(to right, rgb(203, 18, 18), rgb(255, 0, 0), rgb(248, 6, 6))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 6px rgba(227, 5, 5, 0.6), 4px 4px 20px rgba(75, 0, 0, 0.4)',
          letterSpacing: '1.5px',
        }}
      >
        My Love...
      </h1>

      <div className="bg-black/70 p-10 md:p-14 rounded-3xl shadow-2xl border border-red-700 max-w-4xl animate-slideUp">
        <p className="text-xl md:text-2xl text-red-200 italic leading-relaxed mb-10 font-serif animate-fadeInSlow">
          You guessed it right — but my love can’t be counted.
          It flows through time, stars, and this crazy beating heart.
          You are my forever. My always. My infinite.
        </p>

        <div
          className="bg-gradient-to-br from-black via-red-900 to-black p-6 md:p-8 rounded-xl border border-red-800 shadow-[0_0_30px_5px_rgba(255,0,0,0.2)] text-red-100 tracking-wide text-lg md:text-xl leading-loose whitespace-pre-line animate-fadeIn"
          style={{ fontFamily: `'Cormorant Garamond', serif`, fontWeight: 400 }}
        >
          {"I love you in silences,\nwhen the world is asleep,\nin the in-betweens of chaos,\nand in the pauses of my breath.\n\nI love you in echoes\nof every heartbeat,\nin thoughts that come\nwhen I'm not trying to think.\n\nI love you in ways\nwords shy away from,\nthrough looks that linger\nand smiles that stay.\n\nI love you without question,\nwithout end.\nNot just for now,\nbut always.\nEven in the next life,\nif I find you,\nI’ll fall again."}
        </div>

        <p className="mt-10 text-red-300 text-sm italic font-light">
          Yours, beyond infinity.
        </p>

        {/* 🔘 Button Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="bg-gradient-to-r from-red-800 to-red-600 hover:from-red-700 hover:to-red-500 px-8 py-3 rounded-full text-white font-bold tracking-wide transition-all duration-300 shadow-lg"
          >
            Back to Dark Whisperer?
          </a>

          <button
            onClick={toggleMusic}
            className="text-sm text-red-400 hover:text-red-200 transition-all font-mono"
          >
            {isPlaying ? '🔇 Pause Music' : '🔊 Play Music'}
          </button>
        </div>
      </div>

      <audio ref={audioRef} src={boyfriend} loop className="hidden" />
    </div>
  );
}
