import React, { useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import InfinityPuzzle from "./pages/InfinityPuzzle";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <InfinityPuzzle />
      </div>
    </React.Fragment>
  );
}

export default App;
