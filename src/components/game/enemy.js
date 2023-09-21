import React, { useEffect, useRef, useState } from 'react'
import './game.css'

export default function Enemy(props) {
    const [gameStatus, setGameStatus] = useState(props.gameStatus)

    const [containerBounds, setContainerBounds] = useState({ top: 0, bottom: 0 })
    const [enemyPosition, setEnemyPosition] = useState({ y: 200 })
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 })
    const [ballVelocity, setBallVelocity] = useState({ x: 0, y: 0 })


    const enemyRef = useRef(null);
    const blockRef = useRef(null);
    const movementSpeed = 7;

    
    useEffect(() => {
        if (enemyRef.current) {
            const rect = enemyRef.current.getBoundingClientRect();
            setContainerBounds({ top: rect.top, bottom: rect.bottom});
        }
    }, []);

    function distFromEnemyCenter() {
        let centerEnemy = enemyPosition.y + 50
        let centerBall = ballPosition.y + 15
        let distance = centerBall - centerEnemy
        return distance
    }

    function resetEnemy(){
        setEnemyPosition({ y: 200 })
    }

    useEffect(() => {
        const containerHeight = containerBounds.bottom
        //TODO: insert logic here to have block follow the ball as it changes positions
        if (distFromEnemyCenter() > 2 && (enemyPosition.y + 115) < containerHeight) {
            //Move Enemy Down
            setEnemyPosition(prevState => ({
                y: prevState.y + (ballVelocity.x > 0 ? movementSpeed : movementSpeed * 0.25)
            }))
        } else if (distFromEnemyCenter() < -2 && enemyPosition.y > 0) {
            //Move Enemy Up
            setEnemyPosition(prevState => ({
                y: prevState.y - (ballVelocity.x > 0 ? movementSpeed : movementSpeed * 0.25)
            }))
        }
    }, [ballPosition])

    useEffect(() => {
        setBallPosition(props.ballPosition)
    }, [props.ballPosition])

    useEffect(() => {
        setBallVelocity(props.ballVelocity)
    }, [props.ballVelocity])

    useEffect(() => {
        props.onPositionChange(enemyPosition)
    }, [enemyPosition])

    //update game status from parent
    useEffect(() => {
        setGameStatus(props.gameStatus)
    }, [props.gameStatus])

    //reset enemy if requested from game.js
    useEffect(() => {
        if (props.reset === true) {
            resetEnemy()
        }
    }, [props.reset])


    return (
        <div className='enemy' ref={enemyRef}>
            <div className='block' ref={blockRef} style={{ position: 'absolute', top: `${enemyPosition.y}px` }}></div>
        </div>
    )
}
