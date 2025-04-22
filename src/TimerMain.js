import { useEffect, useState } from "react";
import Clock from "./Clock";

function TimerMain(props) {
    const [countdown, setCountdown] = useState({
      minutes: 0,
      seconds: 0,
    });
    const [currentTask, setCurrentTask] = useState("");
    const [timer, setTimer] = useState();

    useEffect(() => {
      if (timer && countdown.minutes === 0 && countdown.seconds === 0) {
        clearInterval(timer);
        setTimer(null);
        new Audio(process.env.PUBLIC_URL + "/alarm.mp3").play();
        const nextTimer = props.next();
        setCountdown({
          minutes: nextTimer.minutes,
          seconds: nextTimer.seconds,
        });
        setCurrentTask(nextTimer.thisTask);
      }
    }, [countdown, timer, props]);

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
      const nextTimer = props.next();
      setCountdown({
        minutes: nextTimer.minutes,
        seconds: nextTimer.seconds,
      });
      setCurrentTask(nextTimer.thisTask);
      event.preventDefault();
    }

  return (
    <div>
      <h1>
        <Clock minutes={countdown.minutes} seconds={countdown.seconds} />
      </h1>
      <h2>{currentTask}</h2>
      <form>
        <button onClick={startPause}>{timer ? "Pause" : "Start"}</button>
        <button onClick={end}>Next</button>
      </form>
    </div>
  );
}

export default TimerMain;
