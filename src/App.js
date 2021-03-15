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

    // Get random robot position within room
    const startPositionX = Math.floor(Math.random() * x);
    const startPositionY = Math.floor(Math.random() * y);
    const startDirection =
      directions[Math.floor(Math.random() * directions.length)];
    setStartPosition({
      x: startPositionX,
      y: startPositionY,
      d: startDirection,
    });
  };

  // On first render, set random value for room size and start position
  useEffect(() => {
    getStartValues();
  }, []);

  const getUpdatedDirection = (movement, prevDir) => {
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

  const getUpdatedPositions = (prevPos) => {
    let x = prevPos.x;
    let y = prevPos.y;

    // Move on y-axis if direction is N or S
    // Move on x-axis if direction is W or E
    if (prevPos.d === "N") {
      y = prevPos.y - 1;
    } else if (prevPos.d === "S") {
      y = prevPos.y + 1;
    } else if (prevPos.d === "W") {
      x = prevPos.x - 1;
    } else if (prevPos.d === "E") {
      x = prevPos.x + 1;
    }

    return { x, y };
  };

  const moveRobot = (userInput) => {
    let newPosition = JSON.parse(JSON.stringify(startPosition));
    const input = userInput.trim();

    for (let i = 0; i < input.length; i++) {
      if (input.charAt(i).toUpperCase() === "L") {
        // Change direction
        const updatedDir = getUpdatedDirection("L", newPosition.d);
        newPosition.d = updatedDir;
      } else if (input.charAt(i).toUpperCase() === "R") {
        // Change direction
        const updatedDir = getUpdatedDirection("R", newPosition.d);
        newPosition.d = updatedDir;
      } else if (input.charAt(i).toUpperCase() === "F") {
        // Change position
        const updatedPositions = getUpdatedPositions(newPosition);
        newPosition.x = updatedPositions.x;
        newPosition.y = updatedPositions.y;
      }
    }
    setEndPosition(newPosition);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    moveRobot(userInput);
  };

  const restartTask = () => {
    setUserInput("");
    setRoomSize({ x: "", y: "" });
    setStartPosition({ x: 0, y: 0, d: "N" });
    setEndPosition({});
    getStartValues();
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
            placeholder="Type to change the robots position..."
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
            <span className="small-info-text">
              please enter robot movements above to get an end position
            </span>
          )}
        </p>
        <button onClick={restartTask}>Restart</button>
      </div>
    </div>
  );
}

export default App;
