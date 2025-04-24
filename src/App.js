import './App.css';
import Clock from "./Clock.js";
import TimeSetter from "./TimeSetter.js";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [timer, setTimer] = useState();
  const [timers, setTimers] = useState([]);
  const [currentTimer, setCurrentTimer] = useState({
    minutes: 0,
    seconds: 0,
    task: ""
  });

  const nextTimer = useCallback(() => {
    if (timers.length > 1) {
      setCurrentTimer({
        minutes: timers[1].minutes,
        seconds: timers[1].seconds,
        task: timers[1].task
      });
    } else {
      setCurrentTimer({
        minutes: 0,
        seconds: 0,
        task: ""
      });
    }
    setTimers(timers.slice(1));
  }, [timers]);

  useEffect(() => {
    if (timer && currentTimer.minutes === 0 && currentTimer.seconds === 0) {
      clearInterval(timer);
      setTimer(null);
      new Audio(process.env.PUBLIC_URL + "/alarm.mp3").play();
      nextTimer();
    }
  }, [currentTimer, timer, nextTimer]);

  function startPause(event) {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    } else {
      setTimer(
        setInterval(() => {
          setCurrentTimer(current => {
            if (current.seconds > 0) {
              return {
                minutes: current.minutes,
                seconds: current.seconds - 1,
                task: current.task
              };
            } else if (current.minutes > 0) {
              return {
                minutes: current.minutes - 1,
                seconds: 59,
                task: current.task
              };
            }
          });
        }, 1000)
      );
    }
    event.preventDefault();
  }

  function end(event) {
    clearInterval(timer);
    setTimer(null);
    nextTimer();
    event.preventDefault();
  }

  function addTime(inputTime, inputTask) {
    setTimers(queue => {
      if (timers.length === 0) {
        setCurrentTimer({
          minutes: inputTime.minutes,
          seconds: inputTime.seconds,
          task: inputTask
        });
      }
      return [...queue, {
        minutes: inputTime.minutes,
        seconds: inputTime.seconds,
        task: inputTask
      }];
    });
  }

  return (
    <div className="App">
      <h1>
        <Clock minutes={currentTimer.minutes} seconds={currentTimer.seconds} />
      </h1>
      <h2>{currentTimer.task}</h2>
      <form>
        <button onClick={startPause}>{timer ? "Pause" : "Start"}</button>
        <button onClick={end}>End</button>
      </form>
      <TimeSetter add={addTime} />
      <h2>Queue</h2>
      {timers.map((timerElement, index) => {
        if (index === 0) {
          return <p></p>;
        }
        return (
          <p>
            <Clock minutes={timerElement.minutes} seconds={timerElement.seconds} />
            {timerElement.task}
          </p>
        );
      })}
    </div>
  );
}

export default App;