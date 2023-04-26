import "./App.css";
import { useEffect, useState } from "react";
// import axios from "axios";
import api from "./axios/api";

function App() {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({ title: "" });
  const [targetId, setTargetId] = useState("");
  const [contents, setContents] = useState("");
  //조회 함수
  const fetchTodos = async () => {
    const { data } = await api.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
    // console.log("data", data);
    setTodos(data);
  };

  // 추가 함수
  const onSubmitHanlder = async () => {
    api.post(`/todos`, inputValue);
    setTodos([...todos, inputValue]);
    fetchTodos();
  };

  //삭제 함수
  const onDeleteButtonHandler = async (id) => {
    api.delete(`/todos/${id}`);
    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
  };
  // 수정 함수
  const onUpdateButtonHandler = async () => {
    api.patch(`/todos/${targetId}`, {
      title: contents,
    });
    setTodos(
      todos.map((item) => {
        if (item.id == targetId) {
          return { ...item, title: contents };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    fetchTodos();
    //db로부터 값을 가져올 것이다.
  }, []);

  return (
    <>
      <div>
        {/* 수정 영역 */}
        <input
          type="text"
          placeholder="수정할 아이디"
          value={targetId}
          onChange={(e) => {
            setTargetId(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="수정할 내용"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button onClick={onUpdateButtonHandler}>수정</button>
        <br />
        <br />
      </div>
      <div>
        {/* input 영역 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            //디폴트 기능을 막아서 form 고유특성인 새로고침을 막는다

            // 버튼 클릭시 input에 들어있는 값(state)를 이용하여 DB에 저장(POST 요청)
            onSubmitHanlder();
          }}
        >
          <input
            type="text"
            value={inputValue.title}
            onChange={(e) => {
              setInputValue({
                title: e.target.value,
              });
            }}
          />
          <button>추가</button>
        </form>
      </div>
      <div>
        {/* 데이터 영역 */}
        {todos?.map((item) => {
          //옵셔널 체이닝
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              &nbsp;
              <button onClick={() => onDeleteButtonHandler(item.id)}>
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default App;
