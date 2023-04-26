import { useDispatch, useSelector } from "react-redux";
import { addNumber, minusNumber } from "./redux/modules/counter";
import "./App.css";

function App() {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();

  const onPlusButtonClickHandler = () => {
    dispatch(addNumber(1));
    // {

    //   type: "",
    //   payload: "",
    // };
  };

  const onMinusButtonClickHandler = () => {
    dispatch(minusNumber(1));
  };

  return (
    <div>
      {number}
      <br />
      <button onClick={onPlusButtonClickHandler}>+</button>
      <button onClick={onMinusButtonClickHandler}>-</button>
    </div>
  );
}

export default App;
