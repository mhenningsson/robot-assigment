import "./App.css";

function App() {
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
        <input
          type="text"
          placeholder="Enter a string to change the robots position..."
        />
        <button>Move robot</button>
      </div>
      <div className="output-ares">
        <p>
          The robot is located in a <strong>random sized</strong> room.
        </p>
        <p>
          Start position: <strong>xxxxxx</strong>
        </p>
        <p>
          End position: <strong>?</strong>
        </p>
        <button>Restart</button>
      </div>
    </div>
  );
}

export default App;
