import './App.css';
import Clock from "./Clock.js";
import TimeSetter from "./TimeSetter.js";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [timers, setTimers] = useState([]);
  const [countdown, setCountdown] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [timer, setTimer] = useState();

  const nextTimer = useCallback(() => {
    setTimers(timers.slice(1));
    if (timers.length > 0) {
      setCountdown({
        minutes: timers[0].minutes,
        seconds: timers[0].seconds,
      });
    } else {
      setCountdown({
        minutes: 0,
        seconds: 0,
      });
    }
  }, [timers]);

  useEffect(() => {
    if (timer && countdown.minutes === 0 && countdown.seconds === 0) {
      clearInterval(timer);
      setTimer(null);
      new Audio(process.env.PUBLIC_URL + "/alarm.mp3").play();
      nextTimer();
    }
  }, [countdown, timer, nextTimer]);

  function startPause(event) {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    } else {
      setTimer(
        setInterval(() => {
          setCountdown(current => {
            if (current.seconds > 0) {
              return {
                minutes: current.minutes,
                seconds: current.seconds - 1,
              };
            } else if (current.minutes > 0) {
              return {
                minutes: current.minutes - 1,
                seconds: 59,
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

  function addTime(inputTime, task) {
    setTimers(queue => {
      if (timers.length === 0) {
        setCountdown({
          minutes: inputTime.minutes,
          seconds: inputTime.seconds
        });
      }
      return [...queue, {
        minutes: inputTime.minutes,
        seconds: inputTime.seconds,
        thisTask: task
      }];
    });
  }

  return (
    <div className="App">
      <h1>
        <Clock minutes={countdown.minutes} seconds={countdown.seconds} />
      </h1>
      <h2>{timers.length > 0 ? timers[0].thisTask : ""}</h2>
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
            {timerElement.thisTask}
          </p>
        );
      })}
    </div>
  );
}

export default App;