import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useAddTaskMutationMutation, useCreateTodoMutation } from '../api/todosApi';
import { useDispatch } from 'react-redux';
import { addTask, addTodo } from '../redux/slices/todoSlice';
import { Task } from '../types/Task';
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
  z-index: 1000;


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


const AddTodoButton = styled.div`
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



interface TodoState {
    title: string;
    tasks : Task[];

    
}


const AddTodo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
const [createTodo, { isLoading }] = useCreateTodoMutation();



  const [newTodo, setNewTodo] = useState<TodoState>({
    title: "",
    tasks: [
        {
            text: "ilk görevim",
            completed: false,
            _id: "",
            todo: "",
            createdAt: Date.now().toString(),


        }
    ],

  });



  const changeHandler = (e: any) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });

  }


  const addNewTodo= async() => {

    if (newTodo.title === "") {
      alert("Görev adı boş olamaz!");
      return;
    }


    await createTodo(newTodo)
    .unwrap()
    .then(() => {
      dispatch(addTodo({
          title: newTodo.title,
          tasks: newTodo.tasks,
          _id: "",
      }));
      
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
    
      <AddTodoButton onClick={handleOpenModal}>Yeni To-do</AddTodoButton>

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <ModalTitle>Yeni To-do</ModalTitle>

        <ModalInput
          type="text"
          name="title"
          placeholder="Yeni To-do"
          value={newTodo.title}
          maxLength={30}
          onChange={changeHandler}
        />


      <AddTodoButton onClick={addNewTodo}>
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
        </AddTodoButton>


        


      </Modal>
    </div>
  );
};

export default AddTodo;
