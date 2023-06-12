import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo} from '../types/Todo';


export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
        }

},
    
  ),
  endpoints: (builder) => ({
    getTodos: builder.query<any, void>({
      query: () => 'get-todos',

      
    }),
    deleteTodoMutation: builder.mutation<Todo, {todoId:string}>({
        query: ({todoId}) => ({
            url: `delete-todo/${todoId}`,
            method: 'DELETE'

        })


    }),

    deleteTask: builder.mutation<Todo, {todoId:string, taskId:string}>({
        query: ({todoId, taskId}) => ({
            url: `delete-task/todo/${todoId}/task/${taskId}`,
            method: 'DELETE',


        })
    }),
    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: 'add-todo',
        method: 'POST',
        body: newTodo,
      }),
    }),
    updateTaskStatus: builder.mutation<Todo, { todo: string, taskId: string, completed:boolean }>({
      query: ({ todo, taskId, completed }) => ({
        url: `update-task-status/todo/${todo}/task/${taskId}`,
        method: 'PUT',
        body : {completed: completed
        
        }
      }),
    }),
    updateTodoTitle: builder.mutation<Todo, { todoId: string, newTitle: string }>({
      query: ({ todoId, newTitle }) => ({
        url: `update-todo-title/${todoId}`,
        method: 'PUT',
        body: { newTitle }, 
      }),
    }),
    addTaskMutation: builder.mutation<Todo, { todoId: string, text: string }>({
      query: ({ todoId, text }) => ({
        url: `add-task/${todoId}`,
        method: 'PUT',
        body: {
            text: text
        }
      }),
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation, useUpdateTaskStatusMutation, useUpdateTodoTitleMutation, useAddTaskMutationMutation, useDeleteTaskMutation, useDeleteTodoMutationMutation } = todosApi;

