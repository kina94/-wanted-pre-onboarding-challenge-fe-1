import React from "react";
import TodoHeader from "../components/todo/TodoHeader";
import TodoList from "../components/todo/TodoList";

function Todos() {
  return (
    <section className="min-h-96 overflow-hidden bg-white w-3/4 m-auto shadow-lg rounded-md p-5">
      <TodoHeader />
      <hr></hr>
      <TodoList></TodoList>
    </section>
  );
}

export default Todos;
