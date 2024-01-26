import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = {
    todo: [
        {
            id: 1,
            text: "Hello World"
        }
    ]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todo.push(todo)
        },
        removeTodo: (state, action) => {
            state.todo = state.todo.filter((todo) => todo.id !== action.payload)
        },

    }
}) 

export const {addTodo, removeTodo} = todoSlice.actions

export default todoSlice.reducer
