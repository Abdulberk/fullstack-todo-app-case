import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useAddTaskMutationMutation } from '../api/todosApi';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slices/todoSlice';

import BarLoader from 'react-spinners/BarLoader';

const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;


`;



const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
`;

const ModalInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #888;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
`;



const ModalContent = styled(motion.div)`
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
    position: relative;
    border-radius: 15px;
`;

const CloseButton = styled.span`
  color: #aaaaaa;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;


const AddTaskButton = styled.div`
width:120px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
font-size:14px;
font-family: 'Montserrat', sans-serif;
font-weight: 600;
background-color: #AF7EEB;
color: #fff;
border-radius: 15px;
box-shadow: 0px 15px 15px rgba(0,0,0,0.2);
position: absolute;
bottom: -15px;
top: 85%;

left: 50%;
transform: translateX(-50%);
&:hover {
    cursor: pointer;
    background-color: #9A6EEB;
}


`

const Modal = ({ isOpen, onClose, children }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
          >
            <CloseButton onClick={onClose}>&times;</CloseButton>
            {children}
          </ModalContent>
          
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};


interface TaskState {
  text: string;
  todoId: string
  isCompleted: boolean;
}


const AddTask = ({todoId}: {todoId:TaskState["todoId"]}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [addTaskMutation, { isLoading }
  ] = useAddTaskMutationMutation();



  const [newTask, setNewTask] = useState<TaskState>({
    text: "",
    todoId: todoId,
    isCompleted: false
  });



  const changeHandler = (e: any) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  }


  const addNewTask = async() => {

    if (newTask.text === "") {
      alert("Görev adı boş olamaz!");
      return;
    }


    await addTaskMutation({text: newTask.text, todoId: newTask.todoId})
    .unwrap()
    .then((data:any) => {
      dispatch(addTask(data));
      
      handleCloseModal();
    }

    )
  }



  
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
    
      <AddTaskButton onClick={handleOpenModal}>Görev Ekle</AddTaskButton>

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <ModalTitle>Görev Ekle</ModalTitle>

        <ModalInput
          type="text"
          name="text"
          placeholder="Görev adı"
          value={newTask.text}
          maxLength={30}
          onChange={changeHandler}
        />


      <AddTaskButton onClick={addNewTask}>
          {isLoading ? (
            <BarLoader
            color="#fff"
            height={5}
            speedMultiplier={2}
            width={40}
          />
          ) : (
            'Ekle'
          )}
        </AddTaskButton>


        


      </Modal>
    </div>
  );
};

export default AddTask;
