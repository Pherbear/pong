import React, {useEffect, useState} from 'react'
import './game.css'
import Ball from './ball';
import Player from './player';

export default function Game(props) {
  const [gameStatus, setGameStatus] = useState(true);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [ballPosition, setBallPosition] = useState({ x: 400, y: 0 });
  const [ballCollision, setBallCollision] = useState({block: 'none'});

  useEffect(() =>{
    if(ballCollision.block == 'left') {
      //console.log(playerPosition)
      //console.log(ballPosition.x)
      if(playerPosition.y > (ballPosition.x + 80) || playerPosition.y < (ballPosition.x - 48)){
        setGameStatus(false)
      }
    }
  },[ballCollision])

  useEffect(()=>{
    //console.log(ballPosition)
    if(ballPosition.x < 148) setBallCollision({block: 'left'})
    else if (ballPosition.x > 605) setBallCollision({block: 'right'})
    else setBallCollision({block: 'none'})
  },[ballPosition])

  useEffect(()=>{
    //sends gameStatus back to parent(app.js)
    props.gameStatus(gameStatus)
  },[gameStatus])

  useEffect(()=>{
    console.log('parent request')
    //called if gamestatus is changed for parent
    if(props.reset === true && gameStatus === false){
      //called if parent requests a reset and game is not running

      //add code here to reset the game

      setGameStatus(true)
    }
  },[props.reset])
  
  return (
    <>
    <div className='game-status'>
      {gameStatus 
      ? <div style={{color:'black'}}>game: game is running</div> 
      : <div style={{color:'black'}}>game: game is not running</div>
      }
    </div>
    <div className="container">
      <div className="game">
        <div className='space'></div>
        <Player onPositionChange={(pos) => setPlayerPosition(pos)}/>
        <Ball onPositionChange={(pos) => setBallPosition(pos)}/>
        <div className='enemy'>
          <div className='block'></div>
        </div>
        <div className='space'></div>
      </div>
    </div>
    </>
  )
}
