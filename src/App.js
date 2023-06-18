import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");

  const [start, setStart] = useState(false);

  let countDownTimer = null;

  useEffect(() => {
    if (start) {
      countDownTimer = setInterval(() => {
        timer();
      }, 1000);
    } else {
      clearInterval(countDownTimer);
    }

    return () => clearInterval(countDownTimer);
  }, [start, second, minute, hour]);

  function timer() {
    if (second > 60) {
      setMinute((prev) => prev + 1);
      setSecond((prev) => parseInt(prev) - 59);
    }

    if (minute > 60) {
      setHour((prev) => prev + 1);
      setMinute((prev) => parseInt(prev) - 60);
    }

    if (hour == 0 && minute == 0 && second == 0) {
      setHour(0);
      setMinute(0);
      setSecond(0);
      setStart(false);
    } else if (second != 0) {
      setSecond((prev) => `${prev <= 10 ? "0" : ""}${prev - 1}`);
    } else if (minute != 0 && second == 0) {
      setSecond(59);
      setMinute((prev) => `${prev <= 10 ? "0" : ""}${prev - 1}`);
    } else if (hour != 0 && minute == 0) {
      setMinute(60);
      setHour((prev) => `${prev < 10 ? "0" : ""}${prev - 1}`);
    }
    return;
  }

  const handleHourChange = (e) => {
    setHour(parseInt(e.target.value));
  };
  const handleMinuteChange = (e) => {
    setMinute(parseInt(e.target.value));
  };
  const handleSecondChange = (e) => {
    setSecond(parseInt(e.target.value));
  };

  const handleStart = () => {
    if (hour === 0 && minute === 0 && second === 0) return;

    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
  };
  const handleReset = () => {
    setSecond("");
    setMinute("");
    setHour("");
    setStart(false);
  };

  return (
    <div className="App">
      <div className="container">
        <span className="title">Count Down Timer</span>
        <div className="container__chilldren">
          <p className="container__chilldren--label">Hours</p>
          <p className="container__chilldren--label">Minutes</p>
          <p className="container__chilldren--label">Seconds</p>
        </div>

        <div className="container__chilldren">
          <input
            placeholder="00"
            maxLength={2}
            className="container__chilldren--inputs"
            type="text"
            value={hour}
            onChange={handleHourChange}
          />
          <p className="container__chilldren--colon">:</p>
          <input
            placeholder="00"
            maxLength={2}
            className="container__chilldren--inputs"
            type="text"
            value={minute}
            onChange={handleMinuteChange}
          />
          <p className="container__chilldren--colon">:</p>
          <input
            placeholder="00"
            maxLength={2}
            className="container__chilldren--inputs"
            type="text"
            value={second}
            onChange={handleSecondChange}
          />
        </div>

        <div className="container__chilldren">
          {!start && (
            <button className="btn start" onClick={handleStart}>
              START
            </button>
          )}
          <button className="btn stop" onClick={handleStop}>
            STOP
          </button>
          <button className="btn reset" onClick={handleReset}>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
