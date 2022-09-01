import React, { useRef } from "react";
import { Todo } from "../../types/todo";
interface Props {
  onChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void;
  todo?: Todo;
}
function TodoForm({ onChange, todo }: Props) {
  return (
    <form className="pt-[4em]">
      <input
        className="px-3 mb-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white bg-white rounded text-sm shadow outline-none border-none focus:outline-none focus:shadow-outline w-full pr-10"
        type="text"
        id="title"
        value={todo?.title}
        onChange={onChange}
        placeholder="할일의 제목을 입력해주세요."
      ></input>
      <textarea
        className="px-3 mb-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white bg-white rounded text-sm shadow outline-none border-none focus:outline-none focus:shadow-outline w-full pr-10"
        style={{ resize: "none" }}
        rows={5}
        id="content"
        value={todo?.content}
        onChange={onChange}
        placeholder="할일의 내용을 입력해주세요."
      ></textarea>
    </form>
  );
}

export default TodoForm;
