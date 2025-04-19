import './App.css';
import { useState } from "react";

function App() {
  const [countdown, setCountdown] = useState({
    minutes: 25,
    seconds: 0,
    workTime: true
  });
  const [timer, setTimer] = useState();
  const alarm = new Audio("/alarm.mp3");

/*  useEffect(() => {
    if (countdown.minutes === 0 && countdown.seconds === 0) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [countdown, timer]);
*/

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
              seconds: current.seconds - 1,
              workTime: current.workTime
            };
          } else if (current.minutes > 0) {
            return {
              minutes: current.minutes - 1,
              seconds: 59,
              workTime: current.workTime
            };
          } else if (current.workTime) {
            alarm.play();
            return {
              minutes: 5,
              seconds: 0,
              workTime: false
            };
          } else {
            alarm.play();
            return {
              minutes: 25,
              seconds: 0,
              workTime: true
            };
          }
        });
      }, 1000));
    }
    event.preventDefault();
  }

  function reset(event) {
    clearInterval(timer);
    setTimer(null);
    setCountdown({
      minutes: 25,
      seconds: 0,
      workTime: true
    })
    event.preventDefault();
  }

  return (
    <div className="App">
      <h1><span className="clock">{countdown.minutes < 10 ? 0 : ""}{countdown.minutes}:{countdown.seconds < 10 ? 0 : ""}{countdown.seconds}</span></h1>
      <h2>{countdown.workTime ? "Work!" : "Break!"}</h2>
      <form>
        <button onClick={startPause}>{timer ? "Pause" : "Start"}</button>
        <button onClick={reset}>Reset</button>
      </form>
    </div>
  );
}

export default App;

/*
  const [countdown, setCountdown] = useState("");
  const [time, setTime] = useState("");

  function handleChange(event) {
    setTime(event.target.value);
  }

  function startTime(event) {
    setCountdown(time);
    setTime("");
    event.preventDefault();
  }

  return (
    <div className="App">
      <h1>{countdown}</h1>
      <form>
        <input value={time} placeholder="Enter time" onChange={handleChange} />
        <button onClick={startTime}>Start</button>
      </form>
    </div>
  );
*/