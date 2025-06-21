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
    "0? That hurts... 😭", "1? Only one? That’s just the beginning. 💔",
    "5? Just a spark... I’m a wildfire 🔥", "10? My love is deeper than that.",
    "15? Baby, that’s not even a quarter. 😒", "20? Mmm, warm-up love. ❤️",
    "25? Closer, but I love harder.", "30? That’s when kisses start getting addictive 😘",
    "35? Getting warmer...", "40? Almost enough to write a poem. 📜",
    "45? A soft whisper, not a scream.", "50? Half? My love doesn’t break even.",
    "55? My heartbeat races faster than that.", "60? You’re sweet... but I’m sweeter. 🍯",
    "65? You’re teasing me now...", "70? Spicy... but not full flame 🔥",
    "75? Warmer baby... almost at the edge. 💥", "80? Close enough to melt steel.",
    "85? You're almost making me blush...", "90? Oof. You're setting me on fire.",
    "95? So close... you’re nearly there 💓", "98? It’s burning... almost... almost...",
    "99? You’re right there baby... one last push...", "100? That’s adorable. But love isn’t just a number. ♾️",
    "111? Mysterious... I like it. 😈", "123? Magic digits. You’re getting playful 💋",
    "143? I-L-Y code cracked 💘", "200? Still not even halfway... ❤️‍🔥",
    "300? You’re giving mythological love now 🔱", "365? One for every day? Sweet. 🌹",
    "500? You're serious huh?", "666? You devil 😈 But I like it...",
    "777? Lucky love? Jackpot kiss 💋", "888? Infinite cuddles? I’m into it. 🫂",
    "999? You’re tempting fate...", "1000? Fire. Raw fire. But still not my true number.",
    "1100? Dramatic much? 😅", "1234? Smooth... romantic hacker 🥺",
    "1500? Titanic level vibes 💦", "2000? Your love needs a time machine now 😄",
    "2024? The year we loved. 💫", "3000? Okay Iron Man 😭 'I love you 3000' huh?",
    "9999? Still not enough, silly boy 😝", "10000? Nope. Still not it.",
    "12345? Sequence complete. But my love is beyond logic 💋",
    "50000? Dramatic. I approve. 💅",
     "69420? 😏 You naughty thing...",
    "99999? Getting obsessive aren’t you 😍",
     "100000? Hot. Red. Boiling. But still not enough.",

    "You're getting close, my heart skipped a beat. 💓",
     "That's adorable, but I'm overflowing with more. ❤️‍🔥",
    "You’re not wrong, but my love’s louder than that. 🔥", 
    "Nice try... but this heart doesn’t stop counting. 🖤",
    "It’s more than that, more than words. 💬❤️",
     "Still short... my love overflows like oceans. 🌊",
    "That’s a spark... but I’m a storm. 🌩️", "Cute guess. But I’m not that easy to read. 😉",
    "You wish... but I’ve loved you forever. ⏳", "Aww, not even close. Try again, cutie. 😚",
    "You're almost setting the world on fire... almost. 🔥", "Getting warm... keep going baby. 🔥🔥",
    "You’re trying, I see you. 😘", "Wrong... but I still love how you try. 💘",
    "Your guess made me blush... but nope. 😳", "Nice one. But the number’s bigger than you think. 😉",
    "That was cute. Do it again. 💋", "You're playing games with my heart 😆",
    "Off by a little... my love is wild. 🌹", "So far... yet I still feel close to you. 💞",
    "Don’t guess, just feel it. It’s infinite. 💫", "One more try, I dare you. 😏",
    "Almost cracked the code... almost. 🧠❤️", "Wrong guess, right guy. 💋",
    "You're close enough to make me fall again. 🖤", "Nope... but I'm impressed by your persistence. 😍",
    "Hah, not even the stars can count my love. ✨", "Still not it. But you’re my favorite mistake. 😉",
    "It’s higher than your score in any game. 🎮❤️", "That’s low... my heart beats louder than that. 💓",
    "It’s getting warmer in here. 😅", "Nope. Try harder, lover boy. 🥵",
    "Close enough for a kiss... but not the number. 💋", "You're hotter than your guess. 🔥",
    "Bzzzzzt. Wrong. But sexy effort. 😈", "More, baby. Give me MORE. 🔥❤️",
    "So close you can feel my breath... but no. 🫦", "You're knocking on the door to my heart... try again. 🚪💘",
    "You're not wrong... you're just not right yet. 😏", "That's not it... but I still want to hug you. 🫂",
    "Even your wrong guess makes me love you more. 💕", "You’re setting off sparks... keep going! ⚡",
    "Nope! But damn, you look cute guessing. 🥺", "You’re not even ready for how much I love you. 😳❤️",
    "Try again, genius. 😎", "That number? Not even close. But my love is. 💞",
    "You're flirting through numbers now? I like it. 😚", "Way off... but your smile makes up for it. 😍",
    "Every wrong guess is still a step closer to my heart. 💓", "Wrong. But you’re still the right one. 💍",
    "Nah. But this game is fun when it’s with you. 🎯❤️"
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
      const nonNumberedResponses = customResponses.filter(r => !/^\d+\?/.test(r));
      const randomResponse = nonNumberedResponses[Math.floor(Math.random() * nonNumberedResponses.length)];
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
