import React, { useState } from 'react';
import './App.css';
import Game from './components/Game';

enum GameState {
  unPlaying = 0,
  playing = 1,
  over = 2,
}
const App: React.FC = () => {
  const [playing, setPlaying] = useState<GameState>(GameState.unPlaying);
  const [overScore, setOverScore] = useState<number>(0);

  const handleGameOver = (score: number) => {
    setPlaying(GameState.over);
    setOverScore(score)
  };

  return (
    <div className="gameBox">
      {playing === GameState.unPlaying && <button className='btn' onClick={() => setPlaying(GameState.playing)}>Play</button>}
      {playing === GameState.playing && <Game onGameOver={handleGameOver} />}
      {playing == GameState.over && <div>
        <p style={{ fontSize: "1.5rem", color: 'green' }}>Score: {overScore}</p>
        <p style={{ fontSize: "2rem" }}>Game Over</p>
        <button className='btn' onClick={() => setPlaying(GameState.playing)}>Restart</button>
      </div>}
    </div>
  );
};

export default App;
