import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../redux/slices/todoSlice";
import { RootState } from "../redux/store";
import { Task } from "../types/Task";
import { useDeleteTaskMutation } from "../api/todosApi";
import Check from "./Check";
import deleteIcon from "../icons/delete.svg";


const RowContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  position: relative;
`;

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  position: relative;

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const RowIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const strikeThroughAnimation = keyframes`
  0% {
    transform: scaleX(0);
  }
  50% {
    transform: scaleX(1.1);
  }
  100% {
    transform: scaleX(1);
  }
`;

const reverseStrikeThroughAnimation = keyframes`
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.1);
  }
  100% {
    transform: scaleX(0);
  }
`;

const RowText = styled.div<{ completed: boolean }>`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #9599b5;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    top: 50%;
    height: 2px;
    background-color: #9599b5;
    transform-origin: left center;
    transform: scaleX(0);
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
  }

  ${(props) =>
    props.completed &&
    css`
      &:after {
        text-decoration: line-through;
        animation-name: ${strikeThroughAnimation};
      }
    `}

  ${(props) =>
    !props.completed &&
    css`
      &:after {
        text-decoration: line-through;
        animation-name: ${reverseStrikeThroughAnimation};
      }
    `}
`;

const DeleteButton = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease-in-out;
  opacity: 0;

  ${Row}:hover & {
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface TaskListProps {
  todoId: string;
}

const TaskList: React.FC<TaskListProps> = ({ todoId }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const [deleteTaskMutation] = useDeleteTaskMutation();

  useEffect(() => {
    const todo = todos.find((todo) => todo._id === todoId);
    if (todo) {
      const sortedTasks = [...todo.tasks].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setAllTasks(sortedTasks);
    }
  }, [todoId, todos]);

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask({ todoId, taskId }));
    deleteTaskMutation({ todoId, taskId });

    const updatedTasks = allTasks.filter((task) => task._id !== taskId);
    setAllTasks(updatedTasks);
  };
  

  return (
    <RowContainer>
      {allTasks.map((task) => (
        <Row key={task._id}>
          <RowIcon>
            <Check completed={task.completed} taskId={task._id} todo={task.todo} />
          </RowIcon>
          <RowText completed={task.completed}>{task.text}</RowText>
          <DeleteButton onClick={() => handleDeleteTask(task._id)}>
            <img src={deleteIcon} alt="delete" />
          </DeleteButton>
        </Row>
      ))}
    </RowContainer>
  );
};

export default TaskList;
