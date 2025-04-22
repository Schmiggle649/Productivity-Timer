import { useState } from "react";
import Clock from "./Clock";

function TimeSetter(props) {
    const [inputTime, setInputTime] = useState({
      minutes: 0,
      seconds: 0,
    });
    const [task, setTask] = useState("");

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
        seconds: newSeconds,
      });
      event.preventDefault();
    }

    function submitTime(event) {
        props.add(inputTime, task);
        setInputTime({
          minutes: 0,
          seconds: 0
        });
        setTask("");
        event.preventDefault();
    }

    function handleTask(event) {
      setTask(event.target.value);
      event.preventDefault();
    }
      
  return (
    <form>
      <button onClick={setInput} className="up" name="1">↑</button>
      <button onClick={setInput} className="up" name="2">↑</button>
      <button onClick={setInput} className="up" name="3">↑</button>
      <button onClick={setInput} className="up" name="4">↑</button>
      <h2 className="input">
        <Clock minutes={inputTime.minutes} seconds={inputTime.seconds} />
      </h2>
      <button onClick={setInput} className="down" name="1">↓</button>
      <button onClick={setInput} className="down" name="2">↓</button>
      <button onClick={setInput} className="down" name="3">↓</button>
      <button onClick={setInput} className="down" name="4">↓</button>
      <br />
      <input value={task} onChange={handleTask} placeholder="Task" />
      <button className="submit" onClick={submitTime}>Submit</button>
    </form>
  );
}

export default TimeSetter;
