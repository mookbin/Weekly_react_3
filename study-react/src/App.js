// import { useState } from "react";
import "./App.css";
import useInput from "./hooks/useInput";

function App() {
  const [name, onChangeNameHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();

  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");

  // const onChangeNameHandler = (e) => {
  //   setName(e.target.value);
  // };

  // const onChangePasswordHandler = (e) => {
  //   setPassword(e.target.value);
  // };
  return (
    <div>
      <input type="text" value={name} onChange={onChangeNameHandler}></input>
      <input
        type="password"
        value={password}
        onChange={onChangePasswordHandler}
      ></input>
    </div>
  );
}

export default App;
