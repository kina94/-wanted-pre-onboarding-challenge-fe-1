import { Todo } from "./../types/todo";
/* ------------ 액션 타입 --------------- */
const GET_TODOS = "todo/GET_TODOS" as const;
// const GET_TODO = "todo/GET_TODO" as const;
const CREATE = "todo/CREATE" as const;
const UPDATE = "todo/UPDATE" as const;
const DELETE = "todo/DELETE" as const;

/* ------------ 액션 생성 함수 ---------------*/
export const getTodos = (todos: Todo[]) => ({ type: GET_TODOS, todos });
// export const getTodo = (todo: Todo) => ({ type: GET_TODO, todo });
export const createTodo = (newTodo: Todo) => ({ type: CREATE, newTodo });
export const updateTodo = (todoIndex: number, newTodo: Todo) => ({
  type: UPDATE,
  todoIndex,
  newTodo,
});
export const deleteTodo = (todoId: number) => ({ type: DELETE, todoId });

/* ------------ 액션 타입 설정 ---------------*/
type TodoAction =
  | ReturnType<typeof getTodos>
  // | ReturnType<typeof getTodo>
  | ReturnType<typeof createTodo>
  | ReturnType<typeof updateTodo>
  | ReturnType<typeof deleteTodo>;

/* ------------ 초기 상태 ---------------*/
type TodoState = {
  todos: Todo[]
  // todo: Todo
}

const initState: TodoState = {
  todos:[{
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    id: "",
  }],

  // todo:{
  //   title: "",
  //   content: "",
  //   createdAt: "",
  //   updatedAt: "",
  //   id: "",
  // }
}

/* ------------ 리듀서 ---------------*/
export const todoReducer = (state: TodoState = initState, action: TodoAction): TodoState => {
  const update = { ...state.todos };

  switch (action.type) {
    case "todo/GET_TODOS":
      return { ...state, todos: action.todos };

    // case "todo/GET_TODO":
    //     return { ...state, todo: action.todo };

    case "todo/CREATE": {
      update[Object.keys(update).length] = action.newTodo;
      return { ...state, todos: update };
    }

    case "todo/UPDATE": {
      update[action.todoIndex] = action.newTodo;
      return { ...state, todos: update };
    }

    case "todo/DELETE": {
      delete update[action.todoId];
      return { ...state, todos: update };
    }
    
    default:
      return state;
  }
};
