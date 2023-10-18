import React from "react";
import "./App.css";
// import AppForCanvas from "./CanvasComponent/AppForCanvas";
// import AppForCanvas from "./CanvasHook/AppForCanvas";
// import SpaceShip from "./Exercices/1/SpaceShip";
// import Asteroid from "./Exercices/1/Asteroid";
// import DrawWithClasses from "./Exercices/2/DrawWithClasses";
import DrawWithMass from "./Exercices/3/DrawWithMass";

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
      <DrawWithMass />
    </main>
  </div>
}

export default App;
