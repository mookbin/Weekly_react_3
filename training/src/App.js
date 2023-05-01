import React, { useState } from "react";

function App() {
  const [condition, setCondition] = useState(false);
  const toggle = () => {
    setCondition(!condition);
  };
  const renderCondition = condition ? "True" : "False";
  return (
    <div className="App">
      <h1>Eunbin</h1>
      <div>{renderCondition}</div>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

export default App;
