import React, { useEffect, useState } from 'react';
import Game from './components/game/game';
import './App.css'

function App() {
  const [gameStatus, setGameStatus] = useState(true)
  const [reset, setReset] = useState(false)

  function resetGame(){
    setReset(true)
    setGameStatus(true)
  }

  useEffect(() => {
    if (gameStatus == true) setReset(false)
  }, [gameStatus])

  return (
    <div>
      <div>
        <Game 
          gameStatus={(status) => setGameStatus(status)}
          reset={reset}
        />
      </div>
      <div className='button'>
        {gameStatus 
        ? <>use arrow keys to move :)</> 
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
