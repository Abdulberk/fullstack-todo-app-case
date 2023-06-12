import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetTodosQuery } from '../api/todosApi';
import { Todo } from '../types/Todo';
import NewTodo from '../components/Todo';
import styled from 'styled-components';
import SyncLoader from 'react-spinners/SyncLoader';
import { setTodos } from '../redux/slices/todoSlice';
import { useDeleteTodoMutationMutation } from '../api/todosApi';
import { deleteTodo } from '../redux/slices/todoSlice';


const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
  min-height: 100vh;
  min-width: 320px;


  @media (min-width: 1024px) and (max-width: 1439px)) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  
    justify-items: center; 
  }

  @media (min-width: 768px) and (max-width: 1023px)) {
    grid-template-columns: repeat(2, 1fr);
   
    justify-items: center; 
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
    justify-items: center; 
  }

  @media (max-width: 320px) {
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
  }

  @media (min-width: 1441px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    justify-items: center;
  }


`;

const TodoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;


  @media (min-width: 1024px) and (max-width: 1439px) {
    grid-template-columns: repeat(3, 1fr);
    
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);

    
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);

  }

  @media (max-width: 320px) {
    grid-template-columns: repeat(1, 1fr);

  }

  @media (min-width: 1441px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }

`;

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: todos, error, isLoading, isSuccess } = useGetTodosQuery();
  const todosState = useSelector((state: any) => state.todos.todos);





  const [deleteTodoMutation
  ] = useDeleteTodoMutationMutation();


  useEffect(() => {
    if (isSuccess) {
      dispatch(setTodos(todos.myTodos));
    }
  }, [dispatch, isSuccess, todos]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader color="#3B82F6" size="15" />
      </div>
    );
  }

  if (error) {
    return <div>An error occurred, please refresh the page</div>;
  }

    const handleDeleteTodo = async(todoId: string) => {

    try {
       await deleteTodoMutation({todoId})

        dispatch(deleteTodo({
          todoId: todoId
        }))
        dispatch(setTodos(todosState.filter((todo: Todo) => todo._id !== todoId)));
  
    }
    catch(err) {
      console.log(err)
    }

    }


  return (
    <DashboardContainer>
      
      {todosState.length > 0 ? (
        <TodoWrapper>
          {todosState.map((todo: Todo) => (
            <NewTodo key={todo._id} todo={todo} onDelete = {handleDeleteTodo} />
          ))}
        </TodoWrapper>
      ) : (
        <p>No todos found</p>
      )}
       
   
    </DashboardContainer>
  );
};

export default Dashboard;
