import './App.css';
import Clock from "./Clock.js";
import TimeSetter from "./TimeSetter.js";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [timer, setTimer] = useState();
  const [timers, setTimers] = useState([]);
  const [currentTimer, setCurrentTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    task: ""
  });
  const [automatic, setAutomatic] = useState(false);

  const nextTimer = useCallback(() => {
    if (timers.length > 1) {
      setCurrentTimer({
        hours: timers[1].hours,
        minutes: timers[1].minutes,
        seconds: timers[1].seconds,
        task: timers[1].task
      });
    } else {
      setCurrentTimer({
        hours: 0,
        minutes: 0,
        seconds: 0,
        task: ""
      });
    }
    setTimers(timers.slice(1));
  }, [timers]);

  useEffect(() => {
    if (timer && currentTimer.hours === 0 && currentTimer.minutes === 0 && currentTimer.seconds === 0) {
      clearInterval(timer);
      setTimer(null);
      new Audio(process.env.PUBLIC_URL + "/alarm.mp3").play();
      if (automatic) {
        nextTimer();
      }
    }
  }, [currentTimer, timer, automatic, nextTimer]);

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
                hours: current.hours,
                minutes: current.minutes,
                seconds: current.seconds - 1,
                task: current.task
              };
            } else if (current.minutes > 0) {
              return {
                hours: current.hours,
                minutes: current.minutes - 1,
                seconds: 59,
                task: current.task
              };
            } else if (current.hours > 0) {
              return {
                hours: current.hours - 1,
                minutes: 59,
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

  function next(event) {
    clearInterval(timer);
    setTimer(null);
    nextTimer();
    event.preventDefault();
  }

  function addTime(inputTime, inputTask) {
    setTimers(queue => {
      if (timers.length === 0) {
        setCurrentTimer({
          hours: inputTime.hours,
          minutes: inputTime.minutes,
          seconds: inputTime.seconds,
          task: inputTask
        });
      }
      return [...queue, {
        hours: inputTime.hours,
        minutes: inputTime.minutes,
        seconds: inputTime.seconds,
        task: inputTask
      }];
    });
  }

  function handleAutoManual(event) {
    setAutomatic(event.target.id === "auto");
  }

  return (
    <div className="App">
      <h1>
        <Clock hours={currentTimer.hours} minutes={currentTimer.minutes} seconds={currentTimer.seconds} />
      </h1>
      <h2>{currentTimer.task}</h2>
      <form>
        <button onClick={startPause}>{timer ? "Pause" : "Start"}</button>
        <button onClick={next}>Next</button>
      </form>
      <TimeSetter add={addTime} />
      <h2>Queue</h2>
      <form className="autoManual" onClick={handleAutoManual}>
        <input type="radio" id="auto" name="autoManual" checked={automatic} />
        <label htmlFor="auto">Automatic</label>
        <input type="radio" id="manual" name="autoManual" checked={!automatic} />
        <label htmlFor="manual">Manual</label>
      </form>
      {timers.map((timerElement, index) => {
        if (index === 0) {
          return <p></p>;
        }
        return (
          <p>
            <Clock hours={timerElement.hours} minutes={timerElement.minutes} seconds={timerElement.seconds} />
            {timerElement.task}
          </p>
        );
      })}
    </div>
  );
}

export default App;