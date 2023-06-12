import React, { useState } from "react";
import styled from "styled-components";
import checkedIcon from "../icons/checked.svg";
import uncheckedIcon from "../icons/unchecked.svg";
import { useUpdateTaskStatusMutation } from "../api/todosApi";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/slices/todoSlice";


const Icon = styled.img<{ completed: boolean }>`
  user-select: none;
  cursor: pointer;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

interface CheckProps {
  completed: boolean;
  todo: string;
  taskId: string;
}

const Check: React.FC<CheckProps> = ({ completed, todo, taskId }) => {


  const [isChecked, setIsChecked] = useState(completed);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const dispatch = useDispatch();

  const handleCheck = async () => {
    try {

      const newStatus = !isChecked;

      await updateTaskStatus({ todo, taskId, completed: newStatus });

      setIsChecked(newStatus);

      dispatch(updateTask({ todoId:todo, taskId, completed: newStatus }));


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Icon
      src={isChecked ? checkedIcon : uncheckedIcon}
      alt={isChecked ? "checked" : "unchecked"}
      completed={isChecked}
      onClick={handleCheck}
    />
  );
};

export default Check;
