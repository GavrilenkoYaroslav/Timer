import React, {useState, useEffect, useLayoutEffect} from 'react';
import {timerStore} from './State/State';
import './App.css';

export const App = () => {

    const [doubleClickTimer, setDoubleClickTimer] = useState(null);
    const [timerState, setTimerState] = useState(0);
    const [timer, setTimer] = useState(new Date(0));

    useLayoutEffect(() => {
        timerStore.subscribe(setTimerState);
        timerStore.init();
    }, []);

    useEffect(() => {
        setTimer(new Date(timerState));
    }, [timerState]);

    const hours = timer.getUTCHours();
    const minutes = timer.getUTCMinutes();
    const seconds = timer.getUTCSeconds();


    const onStart = () => {
        timerStore.tick();
    };

    const onStop = () => {
        timerStore.stop();
    };

    const onWait = () => {
        if (!doubleClickTimer) {
            setDoubleClickTimer(setTimeout(() => {
                clearInterval(doubleClickTimer);
                setDoubleClickTimer(null);
            }, 300));
        } else {
            timerStore.wait();
            setDoubleClickTimer(null);
        }
    };

    const onReset = () => {
        timerStore.resetTimer();
    };

    return (
        <div className="app">
            <div className='app_time'>
                {`${hours < 10? `0${hours}` : hours}:${minutes < 10? `0${minutes}` : minutes}:${seconds < 10? `0${seconds}` : seconds}`}
            </div>
            <div className='app_controls'>
                <button onClick={onStart}>Start</button>
                <button onClick={onStop}>Stop</button>
                <button onClick={onWait}>Wait</button>
                <button onClick={onReset}>Reset</button>
            </div>
        </div>
    );
};
