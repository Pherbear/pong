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
    setReset(false)
    if (gameStatus == false){
      document.addEventListener('keydown', HandleSpace)
    }
  }, [gameStatus])

  const HandleSpace = (event) => {    
    if(event.code === 'Space'){
      resetGame()
      document.removeEventListener('keydown', HandleSpace)
    }  
  };

  return (
    <div>
      <Game gameStatus={(status) => setGameStatus(status)} reset={reset}/>
      <div className='button'>
        {gameStatus 
        ? <>use arrow keys to move :)</> 
        : <>game over: press space to try again.</>}
      </div>
      current cpu difficulty: easy
    </div>
  );
}

export default App;
