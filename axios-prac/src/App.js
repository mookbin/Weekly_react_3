import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState(null);
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:4000/todos");
    // console.log("data", data);
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
    //db로부터 값을 가져올 것이다.
  }, []);

  return (
    <div>
      {todos?.map((item) => {
        //옵셔널 체이닝
        return (
          <div key={item.id}>
            {item.id} : {item.title}
          </div>
        );
      })}
    </div>
  );
}
export default App;
