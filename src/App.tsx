import React from "react";
import "./App.css";
// import AppForCanvas from "./CanvasComponent/AppForCanvas";
// import AppForCanvas from "./CanvasHook/AppForCanvas";
import SpaceShip from "./Exercices/SpaceShip";

function App() {
  return <div className="App">
    <header className="App-header">
      header
    </header>
    <main>
      {/* <AppForCanvas /> */}
      <SpaceShip />
    </main>
  </div>
}

export default App;
