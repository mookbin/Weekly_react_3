import React, { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);

  const Increment = () => {
    setCount(count + 1);
  };

  const clickString = props.click || "Click";
  return (
    <div>
      <button onClick={Increment}>
        {clickString} {count}
      </button>
    </div>
  );
}

export default Counter;
