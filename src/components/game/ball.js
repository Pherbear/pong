import React, {useState, useEffect, useRef} from 'react'
import './game.css'
import './ball.css'

export default function Ball() {
    const containerRef = useRef(null);
    const ballRef = useRef(null);
    const [containerBounds, setContainerBounds] = useState({ left: 0, right: 0 });
    const [ballSize, setBallSize] = useState({ width: 0, height: 0 });
    const [ballPosition, setBallPosition] = useState({  
        x: (containerBounds.right - containerBounds.left) / 2 - ballSize.width / 2, 
        y: 50  
    });
    const [ballVelocity, setBallVelocity] = useState({ x: 5, y: 1 });

    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setContainerBounds({ left: rect.left, right: rect.right });
        }
        if (ballRef.current) {
            const ballRect = ballRef.current.getBoundingClientRect();
            setBallSize({ width: ballRect.width, height: ballRect.height });
        }
    }, []);

    const updateBallPosition = () => {
        let newPosX = ballPosition.x + ballVelocity.x;

        // Check for collision with left boundary
        if (newPosX <= (containerBounds.left * 0.90)) {
            newPosX = (containerBounds.left * 0.90);
            setBallVelocity(prevState => ({ ...prevState, x: -prevState.x }));
        }

        // Check for collision with right boundary - account for ball's width
        const containerWidth = (containerBounds.right * 1.21) - containerBounds.left;
        if (newPosX + ballSize.width >= containerWidth) {
            newPosX = containerWidth - ballSize.width;
            setBallVelocity(prevState => ({ ...prevState, x: -prevState.x }));
            console.log()
        }

        // Set the updated position
        setBallPosition({ x: newPosX, y: ballPosition.y });
    };

    useEffect(() => {
        const interval = setInterval(updateBallPosition, 16); // Roughly 60fps
        return () => clearInterval(interval);
    }, [ballPosition, ballVelocity, containerBounds, ballSize]);

    return (
        <div className='ball-area' ref={containerRef} id='pongBoard'>
          <div className='ball' id="pongBall" ref={ballRef} style={{ position: 'absolute', left: ballPosition.x, top: ballPosition.y }}></div>
        </div>
    )
}
