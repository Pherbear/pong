import React, { useState } from 'react';
import Game from './components/game/game';
import './App.css'

function App() {
  const [gameStatus, setGameStatus] = useState(true)
  const [reset, setReset] = useState(false)

  function resetGame(){
    setReset(true)
    setGameStatus(true)
    setReset(false)
  }

  return (
    <div>
      <div>
        <Game 
          gameStatus={(status) => setGameStatus(status)}
          reset={reset}
        />
      </div>
      <div className='button'>
        parent:
        {gameStatus 
        ? <>game running</> 
        : <>
            game over
            <button onClick={resetGame}>Try again?</button>
          </>
        }
      </div>
    </div>
  );
}

export default App;
