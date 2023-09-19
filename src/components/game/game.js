import React, {useState} from 'react'
import './game.css'
import $ from 'jquery';
import Ball from './ball';
import Player from './player';

export default function Game() {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });

  return (
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
  )
}
