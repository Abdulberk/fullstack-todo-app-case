import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../types/Todo";
import { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";


const initalState = {
    todos: [],

} as { todos: Todo[] }


const todosSlice = createSlice({
    name: 'todos',
    initialState: initalState,
    reducers: {
        setTodos: (state, action) => { 
            state.todos = action.payload
        },
        addTodo: (state, action : PayloadAction<Todo>) => {
            state.todos.push(action.payload) 

        }
        ,
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo:Todo) => todo._id !== action.payload)
        },
        updateTask: (state,action:PayloadAction<{todoId:string, taskId:string, completed:boolean}>) => {
            const {todoId, taskId, completed} = action.payload
            const getTodo = state.todos.find((todo:Todo) => todo._id === todoId) 
            if (getTodo) {
                const getTask = getTodo.tasks.find((task:Task) => task._id === taskId) 

                if (getTask) {
                    getTask.completed = completed;
                }
            }

        },
        addTask: (state, action : PayloadAction<{todoId:string, taskId:string, text:string}>) => {
                const {todoId, taskId, text} = action.payload
                const getTodo = state.todos.find((todo: Todo) => todo._id === todoId)

                if (getTodo) {
                    getTodo.tasks.push({
                        _id: taskId,
                        text,
                        completed: false,
                        todo: todoId,
                        createdAt: new Date().toISOString()
                        
                        
                    }
                    )

                }
                
        },
        deleteTask: (state, action:PayloadAction<{todoId:string, taskId: string}>) => {

            const {todoId, taskId} = action.payload

            const getTodo = state.todos.find((todo:Todo) => todo._id === todoId)

            if (getTodo) {
                getTodo.tasks = getTodo.tasks.filter((task:Task) => task._id !== taskId)
                
            }
        },
            updateTodoTitle: (state, action:PayloadAction<{todoId:string, newTitle:string}>) => {
                const {todoId, newTitle} = action.payload
                const getTodo = state.todos.find((todo:Todo) => todo._id === todoId)

                if (getTodo) {
                    getTodo.title = newTitle
                }


        }

    }

})

export const { setTodos, addTodo, deleteTodo, updateTask, addTask, deleteTask, updateTodoTitle } = todosSlice.actions

export default todosSlice.reducer