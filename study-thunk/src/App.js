import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getTodos } from "./redux/modules/todosSlice";
import React from "react";

function App() {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => {
    return state.todos;
  });

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.id} : {todo.title}{" "}
          </div>
        );
      })}
    </div>
  );

  return <div>Thunk App</div>;
}

export default App;
