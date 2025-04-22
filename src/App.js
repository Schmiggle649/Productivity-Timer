import './App.css';
import Clock from "./Clock.js";
import TimerMain from "./TimerMain.js";
import TimeSetter from "./TimeSetter.js";
import { useState } from "react";

function App() {
  const [timers, setTimers] = useState([]);

  function addTime(inputTime, task) {
    setTimers(queue => {
      return [...queue, {
        minutes: inputTime.minutes,
        seconds: inputTime.seconds,
        thisTask: task
      }];
    });
  }

  function nextTimer() {
    setTimers(timers.slice(1));
    if (timers.length > 0) {
      return timers[0];
    } else {
      return {
        minutes: 0,
        seconds: 0,
        thisTask: ""
      };
    }
  }

  return (
    <div className="App">
      <TimerMain next={nextTimer} />
      <TimeSetter add={addTime} />
      <h2>Queue</h2>
      {timers.map(timerElement => {
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