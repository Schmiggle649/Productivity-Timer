import { useState } from "react";
import Clock from "./Clock";

function TimeSetter(props) {
    const [inputTime, setInputTime] = useState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    const [inputTask, setInputTask] = useState("");
    const [inputChecker, setInputChecker] = useState("");

    function handleTime(event) {
      let newHours = inputTime.hours;
      let newMinutes = inputTime.minutes;
      let newSeconds = inputTime.seconds;
      switch (event.target.name) {
        case "h1":
          if (event.target.className === "up") {
            if (newHours >= 90) {
              newHours -= 90;
            } else {
              newHours += 10;
            }
          } else {
            if (newHours < 10) {
              newHours += 90;
            } else {
              newHours -= 10;
            }
          }
          break;
        case "h2":
          if (event.target.className === "up") {
            if (newHours % 10 === 9) {
              newHours -= 9;
            } else {
              newHours += 1;
            }
          } else {
            if (newHours % 10 === 0) {
              newHours += 9;
            } else {
              newHours -= 1;
            }
          }
          break;
        case "m1":
          if (event.target.className === "up") {
            if (newMinutes >= 50) {
              newMinutes -= 50;
            } else {
              newMinutes += 10;
            }
          } else {
            if (newMinutes < 10) {
              newMinutes += 50;
            } else {
              newMinutes -= 10;
            }
          }
          break;
        case "m2":
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
        case "s1":
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
        hours: newHours,
        minutes: newMinutes,
        seconds: newSeconds,
      });
      event.preventDefault();
    }

    function handleTask(event) {
      setInputTask(event.target.value);
      event.preventDefault();
    }

    function submitTime(event) {
      if (inputTime.hours === 0 && inputTime.minutes === 0 && inputTime.seconds === 0) {
        setInputChecker("Please set a time");
      } else if (inputTask === "") {
        setInputChecker("Please set a task");
      } else {
        props.add(inputTime, inputTask);
        setInputTime({
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        setInputTask("");
        setInputChecker("");
      }
      event.preventDefault();
    }
      
  return (
    <div>
      <form>
        <button onClick={handleTime} className="up" name="h1">↑</button>
        <button onClick={handleTime} className="up" name="h2">↑</button>
        <button onClick={handleTime} className="up" name="m1">↑</button>
        <button onClick={handleTime} className="up" name="m2">↑</button>
        <button onClick={handleTime} className="up" name="s1">↑</button>
        <button onClick={handleTime} className="up" name="s2">↑</button>
        <h2 className="inputClock">
          <Clock hours={inputTime.hours} minutes={inputTime.minutes} seconds={inputTime.seconds} />
        </h2>
        <button onClick={handleTime} className="down" name="h1">↓</button>
        <button onClick={handleTime} className="down" name="h2">↓</button>
        <button onClick={handleTime} className="down" name="m1">↓</button>
        <button onClick={handleTime} className="down" name="m2">↓</button>
        <button onClick={handleTime} className="down" name="s1">↓</button>
        <button onClick={handleTime} className="down" name="s2">↓</button>
        <br />
        <input className="submit" value={inputTask} onChange={handleTask} placeholder="Task" />
        <button className="submit" onClick={submitTime}>Submit</button>
      </form>
      <h3>{inputChecker}</h3>
    </div>
  );
}

export default TimeSetter;
