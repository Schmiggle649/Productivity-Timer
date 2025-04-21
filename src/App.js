import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [countdown, setCountdown] = useState({
    minutes: 0,
    seconds: 0
  });
  const [inputTime, setInputTime] = useState({
    minutes: 0,
    seconds: 0
  });
  const [task, setTask] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [timers, setTimers] = useState([]);
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (timer && countdown.minutes === 0 && countdown.seconds === 0) {
      clearInterval(timer);
      setTimer(null);
      const alarm = new Audio(process.env.PUBLIC_URL + "/alarm.mp3");
      alarm.play();
      setTimers(timers.slice(1));
      if (timers.length > 0) {
        setCountdown({
          minutes: timers[0].minutes,
          seconds: timers[0].seconds
        });
        setCurrentTask(timers[0].thisTask);
      }
    }
  }, [countdown, timer, timers]);

  function startPause(event) {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    } else {
      setTimer(setInterval(() => {
        setCountdown(current => {
          if (current.seconds > 0) {
            return {
              minutes: current.minutes,
              seconds: current.seconds - 1
            };
          } else if (current.minutes > 0) {
            return {
              minutes: current.minutes - 1,
              seconds: 59
            };
          }
        });
      }, 1000));
    }
    event.preventDefault();
  }

  function end(event) {
    clearInterval(timer);
    setTimer(null);
    setTimers(timers.slice(1));
    if (timers.length > 0) {
      setCountdown({
        minutes: timers[0].minutes,
        seconds: timers[0].seconds
      });
      setCurrentTask(timers[0].thisTask);
    } else {
      setCountdown({
        minutes: 0,
        seconds: 0
      });
      setCurrentTask("");
    }
    event.preventDefault();
  }

  function setInput(event) {
    let newMinutes = inputTime.minutes;
    let newSeconds = inputTime.seconds;
    switch (event.target.name) {
    case "1":
      if (event.target.className === "up") {
        if (newMinutes >= 90) {
          newMinutes -= 90;
        } else {
          newMinutes += 10;
        }
      } else {
        if (newMinutes < 10) {
          newMinutes += 90;
        } else {
          newMinutes -= 10;
        }
      }
      break;
    case "2":
      if (event.target.className === "up") {
        if (newMinutes % 10 === 9) {
          newMinutes -= 9;
        } else {
          newMinutes += 1;
        }
      } else {
        if (newMinutes % 10 === 0) {
          newMinutes += 9;
        } else {
          newMinutes -= 1;
        }
      }
      break;
    case "3":
      if (event.target.className === "up") {
        if (newSeconds >= 50) {
          newSeconds -= 50;
        } else {
          newSeconds += 10;
        }
      } else {
        if (newSeconds < 10) {
          newSeconds += 50;
        } else {
          newSeconds -= 10;
        }
      }
      break;
    default:
      if (event.target.className === "up") {
        if (newSeconds % 10 === 9) {
          newSeconds -= 9;
        } else {
          newSeconds += 1;
        }
      } else {
        if (newSeconds % 10 === 0) {
          newSeconds += 9;
        } else {
          newSeconds -= 1;
        }
      }
      break;
    }
    setInputTime({
      minutes: newMinutes,
      seconds: newSeconds
    });
    event.preventDefault();
  }

  function submitTime(event) {
    if (timers.length === 0 && countdown.minutes === 0 && countdown.seconds === 0) {
      setCountdown(inputTime);
      setCurrentTask(task);
    } else {
      setTimers(queue => {
        return [...queue, {
          minutes: inputTime.minutes,
          seconds: inputTime.seconds,
          thisTask: task
        }];
      });
    }
    setInputTime({
      minutes: 0,
      seconds: 0
    });
    event.preventDefault();
  }

  function handleTask(event) {
    console.log(event.target.value);
    setTask(event.target.value);
    event.preventDefault();
  }

  return (
    <div className="App">
      <h1><span className="clock">{countdown.minutes < 10 ? 0 : ""}{countdown.minutes}:{countdown.seconds < 10 ? 0 : ""}{countdown.seconds}</span></h1>
      <h2>{currentTask}</h2>
      <form>
        <button onClick={startPause}>{timer ? "Pause" : "Start"}</button>
        <button onClick={end}>End</button>
      </form>
      <form>
        <button onClick={setInput} className="up" name="1">↑</button>
        <button onClick={setInput} className="up" name="2">↑</button>
        <button onClick={setInput} className="up" name="3">↑</button>
        <button onClick={setInput} className="up" name="4">↑</button>
        <h2 className="input"><span className="clock">{inputTime.minutes < 10 ? 0 : ""}{inputTime.minutes}:{inputTime.seconds < 10 ? 0 : ""}{inputTime.seconds}</span></h2>
        <button onClick={setInput} className="down" name="1">↓</button>
        <button onClick={setInput} className="down" name="2">↓</button>
        <button onClick={setInput} className="down" name="3">↓</button>
        <button onClick={setInput} className="down" name="4">↓</button><br />
        <input value={task} onChange={handleTask} placeholder="Task" />
        <button className="submit" onClick={submitTime}>Submit</button>
      </form>
      <h2>Queue</h2>
      {timers.map(timerElement => {
        return (
          <p>
            <span className="clock">{timerElement.minutes < 10 ? 0 : ""}{timerElement.minutes}:{timerElement.seconds < 10 ? 0 : ""}{timerElement.seconds}</span>
            {timerElement.thisTask}
          </p>
        );
      })}
    </div>
  );
}

export default App;