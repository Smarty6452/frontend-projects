import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "Hello World" }],
};

//create reducer

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //current sit = state
    //action = value or id
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload);
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === nanoid);

      if (todoIndex != -1) {
        state.todos[todoIndex].text = newText;
      }
    },
  },
});

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions

export default todoSlice.reducer
