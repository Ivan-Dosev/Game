// Timer.js
import React, { useEffect } from 'react';

const Timer = ({ timer, setTimer, isTimerRunning, setIsGameFinished }) => {
    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 100);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, setTimer]);

    const formatTime = (time) => {
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}s`;
    };

    return (
        <div className="timer">
            <h1>Time: {formatTime(timer)}</h1>
        </div>
    );
};

export default Timer;