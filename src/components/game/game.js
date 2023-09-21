import React, {useEffect, useState} from 'react'
import './game.css'
import Ball from './ball';
import Player from './player';


export default function Game(props) {
  const [gameStatus, setGameStatus] = useState(true);
  const [gameReset, setGameReset] = useState(false)
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [ballPosition, setBallPosition] = useState({ x: 400, y: 0 });
  const [ballCollision, setBallCollision] = useState({block: 'none'});


  //checks if collision touches block of player or opponent
  useEffect(() =>{
    //player collision
    if(ballCollision.block == 'left') {
      console.log(playerPosition)
      console.log(ballPosition)
      if(playerPosition.y > (ballPosition.y + 30) || playerPosition.y < (ballPosition.y - 100)){
        setGameStatus(false)
      }
    }

    //opponent collision
    if(ballCollision.block == 'right'){
      //TODO: insert logic here to check for opponent collision
    }
  },[ballCollision])

  //checks when a collison occurs between ball and boundaries
  useEffect(()=>{
    //player
    if(ballPosition.x < 148) setBallCollision({block: 'left'})
    //opponent
    else if (ballPosition.x > 605) setBallCollision({block: 'right'})
    //no collision occuring
    else setBallCollision({block: 'none'})
  }, [ballPosition])


  //sends gameStatus back to parent(app.js)
  useEffect(()=>{
    props.gameStatus(gameStatus)
    if (gameStatus == true) setGameReset(false)
  },[gameStatus])

  //called if parent request reset
  useEffect(()=>{
    if(props.reset === true && gameStatus === false){
      setGameReset(true)
      setGameStatus(true)
    }
  },[props.reset])
  
  return (
    <>
    <div className="container">
      <div className="game">
        <div className='space'></div>
        <Player 
          onPositionChange={(pos) => setPlayerPosition(pos)}
          gameStatus={gameStatus}
          reset={gameReset}
        />
        <Ball 
          onPositionChange={(pos) => setBallPosition(pos)}
          gameStatus={gameStatus}
          reset={gameReset}
          playerPosition={playerPosition}
        />
        <div className='enemy'>
          <div className='block'></div>
        </div>
        <div className='space'></div>
      </div>
    </div>
    </>
  )
}
