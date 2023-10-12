import React from "react";
import "./App.css";
// import AppForCanvas from "./CanvasComponent/AppForCanvas";
// import AppForCanvas from "./CanvasHook/AppForCanvas";
// import SpaceShip from "./Exercices/1/SpaceShip";
// import Asteroid from "./Exercices/1/Asteroid";
// import DrawWithClasses from "./Exercices/2/DrawWithClasses";
import AnimateDrawing from "./Exercices/3/AnimateDrawing";

function App() {
  return <div className="App">
    <header className="App-header">
      header
    </header>
    <main>
      {/* <AppForCanvas /> */}
      {/* <SpaceShip /> */}
      {/* <Asteroid /> */}
      {/* <DrawWithClasses /> */}
      <AnimateDrawing />
    </main>
  </div>
}

export default App;
