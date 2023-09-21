import React, { useState, useEffect, useRef } from 'react';
import './game.css';

export default function Player(props) {
    const [gameStatus, setGameStatus] = useState(props.gameStatus)
    const [position, setPosition] = useState({ y: 200 });
    const [keysPressed, setKeysPressed] = useState({
        ArrowUp: false,
        ArrowDown: false
    });

    const playerRef = useRef(null);
    const blockRef = useRef(null);
    const movementSpeed = 20;

    //called if parent (game.js) changes status of game (true/false)
    useEffect(() => {
        setGameStatus(props.gameStatus)
    }, [props.gameStatus])

    //called if parent (game.js) calls a reset
    useEffect(() => {
        if (props.reset === true) {
            resetPlayer()
        }
    }, [props.reset])

    //reset the player position to the middle
    function resetPlayer() {
        setPosition({ y: 200 })
        requestAnimationFrame(resetPlayer)
    }

    const updatePosition = () => {
        if (!playerRef.current || !blockRef.current) return;

        const playerBounds = playerRef.current.getBoundingClientRect();
        const blockBounds = blockRef.current.getBoundingClientRect();

        let newY = position.y;

        if (keysPressed.ArrowUp && newY > 0) {
            newY -= movementSpeed;
        }
        if (keysPressed.ArrowDown && newY + blockBounds.height < playerBounds.height) {
            newY += movementSpeed;
        }

        if (gameStatus == true){
            setPosition({ y: newY })
            requestAnimationFrame(updatePosition)
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (keysPressed.hasOwnProperty(event.key)) {
                setKeysPressed(prev => ({ ...prev, [event.key]: true }));
            }
        };

        const handleKeyUp = (event) => {
            if (keysPressed.hasOwnProperty(event.key)) {
                setKeysPressed(prev => ({ ...prev, [event.key]: false }));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Start the animation loop
        requestAnimationFrame(updatePosition);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [keysPressed]);

    useEffect(() => {
        props.onPositionChange(position)
    }, [position])

    return (
        <div className='player' ref={playerRef}>
            <div className='block' ref={blockRef} style={{ position: 'absolute', top: `${position.y}px` }}></div>
        </div>
    );
}