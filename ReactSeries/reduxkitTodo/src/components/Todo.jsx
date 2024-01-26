import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../features/todo/todoSlice';

const Todo = () => {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Todos</h1>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border-b py-2 transition duration-300 hover:bg-gray-100"
            >
              <span className="text-lg">{todo.text}</span>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-red-500 hover:text-red-700"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
