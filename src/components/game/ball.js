import React, {useState, useEffect, useRef} from 'react'
import './game.css'
import './ball.css'

export default function Ball(props) {

    let initialSpeed = 2

    const containerRef = useRef(null)
    const ballRef = useRef(null)

    const [gameStatus, setGameStatus] = useState(props.gameStatus)
    const [containerBounds, setContainerBounds] = useState({ left: 0, right: 0 })

    const [ballSize, setBallSize] = useState({ width: 0, height: 0 })
    const [ballPosition, setBallPosition] = useState({ x: 500, y: 200 })
    const [ballVelocity, setBallVelocity] = useState({ x: initialSpeed, y: 0 })

    const [playerPosition, setPlayerPosition] = useState({ y:0 })



    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setContainerBounds({ left: rect.left, right: rect.right, bottom: rect.bottom});
        }
        if (ballRef.current) {
            const ballRect = ballRef.current.getBoundingClientRect();
            setBallSize({ width: ballRect.width, height: ballRect.height });
        }
    }, []);

    //resets the balls position and velocity
    function resetBall() {
        setBallPosition({ x: 500, y: 200 })
        setBallVelocity({ x: initialSpeed, y: 0 })
        setGameStatus(true)
    }

    //calculation of distance the ball has from the center of the player block
    function distFromPlayerCenter() {
        let speedMulitplier = 0.10
        let centerPlayer = playerPosition.y + 50
        let centerBall = ballPosition.y + 15
        let distance = centerBall - centerPlayer
        return (distance * speedMulitplier)
    }

    const updateBallPosition = () => {
        let speedIncrease = 0.5
        let newPosX = ballPosition.x + ballVelocity.x;
        let newPosY = ballPosition.y + ballVelocity.y;

        // Check for collision with left boundary
        if (newPosX <= (containerBounds.left * 0.90)) {
            newPosX = (containerBounds.left * 0.90);
            setBallVelocity(prevState => ({ 
                ...prevState, 
                x: -prevState.x + speedIncrease, 
                y: distFromPlayerCenter()
            }));
        }

        // Check for collision with right boundary - account for ball's width
        const containerWidth = (containerBounds.right * 1.21) - containerBounds.left;
        if (newPosX + ballSize.width >= containerWidth) {
            newPosX = containerWidth - ballSize.width;
            setBallVelocity(prevState => ({ 
                ...prevState, 
                x: -prevState.x - speedIncrease 
            }));
        }

        //checks for collision with top of screen
        if (newPosY <= 0) {
            newPosY = 0
            setBallVelocity(prevState => ({
                ...prevState,
                y: -prevState.y
            }))
        }

        //checks for collision with bottom of screen
        const containerHeight = containerBounds.bottom
        if(newPosY + ballSize.width >= containerHeight){
            newPosY = containerHeight - ballSize.width
            setBallVelocity(prevState => ({
                ...prevState,
                y: -prevState.y
            }))
        }

        // Set the updated position
        if(gameStatus == true) setBallPosition({ x: newPosX, y: newPosY });
    };


    useEffect(() => {
        const interval = setInterval(updateBallPosition, 16); // Roughly 60fps
        return () => clearInterval(interval);
    }, [ballPosition, ballVelocity, containerBounds, ballSize]);

    //sends ball position to parent
    useEffect(()=>{
        props.onPositionChange(ballPosition)
    },[ballPosition])

    //update player position from parent
    useEffect(()=>{
        setPlayerPosition(props.playerPosition)
    },[props.playerPosition])

    //update game status from parent
    useEffect(() => {
        setGameStatus(props.gameStatus)
    }, [props.gameStatus])

    //reset ball if requested from game.js
    useEffect(() => {
        if (props.reset === true) {
            resetBall()
        }
    }, [props.reset])

    return (
        <div className='ball-area' ref={containerRef} id='pongBoard'>
          <div className='ball' id="pongBall" ref={ballRef} style={{ position: 'absolute', left: ballPosition.x, top: ballPosition.y }}></div>
        </div>
    )
}
