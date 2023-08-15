import React from "react";
import "./App.css";
// import AppForCanvas from "./CanvasComponent/AppForCanvas";
import AppForCanvas from "./CanvasHook/AppForCanvas";

function App() {
  return <div className="App">
    <header className="App-header">
      header
    </header>
    <main>
      <AppForCanvas />
    </main>
  </div>
}

export default App;
