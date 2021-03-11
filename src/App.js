import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [roomSize, setRoomSize] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState([0, 0, "N"]);
  const [endPosition, setEndPosition] = useState([]);
  const directions = ["E", "W", "N", "S"];

  const getStartValues = () => {
    // Get random sized room
    const min = 5;
    const max = 10;
    const x = Math.floor(Math.random() * (max - min + 1) + min);
    const y = Math.floor(Math.random() * (max - min + 1) + min);
    setRoomSize({ x, y });

    // Get robot position within room
    const robotPositionX = Math.floor(Math.random() * x);
    const robotPositionY = Math.floor(Math.random() * y);
    const robotDirection =
      directions[Math.floor(Math.random() * directions.length)];
    setStartPosition([robotPositionX, robotPositionY, robotDirection]);
  };

  // On first render, set random value for room size and start position
  useEffect(() => {
    getStartValues();
  }, []);

  const moveRobot = (userInput) => {
    setUserInput("");
  };

  const restartTask = () => {
    setUserInput("");
    setEndPosition([]);
    setStartPosition([]);
    setRoomSize({ x: "", y: "" });
    getStartValues();
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    moveRobot(userInput);
  };

  return (
    <div className="App">
      <h1>Robot Assigment</h1>
      <div className="info-text">
        <p>Move the robot using the following commands:</p>
        <ul>
          <li>
            <strong>L:</strong> turn left
          </li>
          <li>
            <strong>R:</strong> turn right
          </li>
          <li>
            <strong>F:</strong> walk forward
          </li>
        </ul>
      </div>
      <div className="input-area">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => handleChange(e)}
            placeholder="Enter a string to change the robots position..."
          />
          <button type="submit">Move robot</button>
        </form>
      </div>
      <div className="output-area">
        <p>
          The robot is located in a{" "}
          <strong>
            {roomSize.x}x{roomSize.y}
          </strong>{" "}
          room.
        </p>
        <p>
          Start position: <strong>{startPosition.join(", ")}</strong>
        </p>
        <p>
          End position:{" "}
          {endPosition.length > 0 ? (
            <strong>{endPosition.join(", ")}</strong>
          ) : (
            <em>please enter robot movements above to get an end position</em>
          )}
        </p>
        <button onClick={restartTask}>Restart</button>
      </div>
    </div>
  );
}

export default App;
