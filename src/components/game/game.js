import React from 'react'
import './game.css'
import $ from 'jquery';

export default function Game() {

  var player = $('#player'),
  block = $('#block'),
  wh = player.width() - block.width(),
  wv = player.height() - block.height(),
  d = {},
  x = 6;

  function newh(v,a,b) {
      var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
      return n < 0 ? 0 : n > wh ? wh : n;
  }

  function newv(v,a,b) {
      var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
      return n < 0 ? 0 : n > wv ? wv : n;
  }


  $(window).keydown(function(e) { d[e.which] = true; });
  $(window).keyup(function(e) { d[e.which] = false; });

  setInterval(function() {
      block.css({
          left: function(i,v) { return newh(v, 37, 39); },
          top: function(i,v) { return newv(v, 38, 40); }
      });
      wh = player.width() - block.width();
      wv = player.height() - block.height();
  }, 20);




  return (
    <div className ="container">
        <div className="game">
          <div className='space'></div>
          <div className='player' id='player'>
            <div className='block' id='block'></div>
          </div>
          <div className='ball-area'>
            <div className='ball'></div>
          </div>
          <div className='enemy'>
            <div className='block'></div>
          </div>
        <div className='space'></div>
        </div>
    </div>
  )
}
