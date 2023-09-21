import React, {useEffect, useState} from 'react'
import './game.css'
import Ball from './ball';
import Player from './player';
import Enemy from './enemy';


export default function Game(props) {
  const [gameStatus, setGameStatus] = useState(true);
  const [gameReset, setGameReset] = useState(false)

  const [enemyPosition, setEnemyPosition] = useState({ y:0 })
  const [playerPosition, setPlayerPosition] = useState({ y: 0 });

  const [ballPosition, setBallPosition] = useState({ x: 400, y: 0 });
  const [ballCollision, setBallCollision] = useState({block: 'none'});
  const [ballVelocity, setBallVelocity] = useState({ x: 0, y: 0 })

  //checks if collision touches block of player or opponent
  useEffect(() =>{
    //player collision
    if(ballCollision.block == 'left') {
      if(playerPosition.y > (ballPosition.y + 30) || playerPosition.y < (ballPosition.y - 105)){
        setGameStatus(false)
      }
    }

    //opponent collision
    if(ballCollision.block == 'right'){
      if(enemyPosition.y > (ballPosition.y + 30) || enemyPosition.y < (ballPosition.y - 100)){
        setGameStatus(false)

      }
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
          onVelocityChange={(pos) => setBallVelocity(pos)}
          gameStatus={gameStatus}
          reset={gameReset}
          playerPosition={playerPosition}
          enemyPosition={enemyPosition}
        />
        <Enemy
          onPositionChange={(pos) => setEnemyPosition(pos)}
          gameStatus={gameStatus}
          reset={gameReset}
          ballPosition={ballPosition}
          ballVelocity={ballVelocity}
        />
        <div className='space'></div>
      </div>
    </div>
    </>
  )
}
