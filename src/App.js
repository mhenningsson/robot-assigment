import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [roomSize, setRoomSize] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0, d: "N" });
  const [endPosition, setEndPosition] = useState({});
  const directions = ["N", "E", "S", "W"];

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

    setStartPosition({
      x: robotPositionX,
      y: robotPositionY,
      d: robotDirection,
    });
  };

  // On first render, set random value for room size and start position
  useEffect(() => {
    getStartValues();
  }, []);

  const getCardinalDirection = (movement, prevDir) => {
    let newDir = "";
    if (movement === "L") {
      if (prevDir === "N") {
        newDir = "W";
      } else if (prevDir === "E") {
        newDir = "N";
      } else if (prevDir === "S") {
        newDir = "E";
      } else if (prevDir === "W") {
        newDir = "S";
      }
    } else if (movement === "R") {
      if (prevDir === "N") {
        newDir = "E";
      } else if (prevDir === "E") {
        newDir = "S";
      } else if (prevDir === "S") {
        newDir = "W";
      } else if (prevDir === "W") {
        newDir = "N";
      }
    }
    return newDir;
  };

  const moveRobot = (userInput) => {
    let newPosition = JSON.parse(JSON.stringify(startPosition));
    const input = userInput.trim();

    for (let i = 0; i < input.length; i++) {
      if (input.charAt(i).toUpperCase() === "L") {
        // Change direction
        const newDir = getCardinalDirection("L", newPosition.d);
        newPosition.d = newDir;
      }
      if (input.charAt(i).toUpperCase() === "R") {
        // Change direction
        const newDir = getCardinalDirection("R", newPosition.d);
        newPosition.d = newDir;
      }
      if (input.charAt(i).toUpperCase() === "F") {
        // Change position
      }
    }
    setEndPosition(newPosition);
    setUserInput("");
  };

  const restartTask = () => {
    setUserInput("");
    setRoomSize({ x: "", y: "" });
    setStartPosition({ x: 0, y: 0, d: "N" });
    setEndPosition({});
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
          Start position:{" "}
          <strong>
            {startPosition.x}, {startPosition.y}, {startPosition.d}
          </strong>
        </p>
        <p>
          End position:{" "}
          {endPosition.x ? (
            <strong>
              {endPosition.x}, {endPosition.y}, {endPosition.d}
            </strong>
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
