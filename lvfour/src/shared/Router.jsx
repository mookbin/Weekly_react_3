import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTodo from "../pages/AddTodo";
import Home from "../pages/Home";
import Todo from "../pages/Todo";
import Todos from "../pages/Todos";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Todos />} />
        <Route path="/works/:id" element={<Todo />} />
        <Route path="/work/add" element={<AddTodo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
