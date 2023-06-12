import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import TaskList from './TaskList'
import { Todo } from '../types/Todo'
import { Icon } from '@iconify/react';
import deleteTodoIcon from '../icons/delete-todo.svg'
import editTodoIcon from '../icons/edit-todo.svg'

import AddTask from './AddTask'


const Container = styled.div`
    width:280px;
    height:260px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap: 15px;
    position: relative;

    `




    const TitleContainer = styled.div`
    width:100%;
    height:45px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:row;
    background-color: #AF7EEB;
    



    `

    const Menu = styled.div`
    width:40px;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;

    &:hover {
        cursor: pointer;
        background-color: #9A6EEB;
    }


    `


    const DropdownMenuContainer = styled.div`
    width:120px;
    height:auto;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 100;


    `

    const DropdownMenu = styled.ul`
    width:100%;
    height:auto;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    list-style:none;
    border-radius: 15px;
    box-shadow: 0px 10px 15px rgba(0,0,0,0.1);
    background-color: #fff;


    `
    const DropdownItem = styled.li`
    width:100%;
    height:40px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    font-size:14px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    color: #000;
    gap: 10px;
    padding-left: 15px;
    border-radius: inherit;
    &:hover {
        cursor: pointer;
        background-color: #9A6EEB;
    }

    `


    const Title = styled.div`
    width: calc(100% - 40px);
    height: 100%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: #fff;
    `
    const ContentContainer = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #AF7EEB #f5f5f5;
    position: relative;
    
  
    &::-webkit-scrollbar {
      width: 10px;
      
     
    }
  
    &::-webkit-scrollbar-thumb {
      background-color: #AF7EEB;
      border-radius: 6px;
  
      &:hover {
        background-color: #9A6EEB;
      }
    }
  
    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
      border-radius: 3px;
    }
  `;


    
interface NewTodoProps {
    todo: Todo;
    onDelete: (todoId: string) => void;
  }

function NewTodo({ todo, onDelete }: NewTodoProps
    ) {
        const [showMenu, setShowMenu] = useState(false)

        const toggleMenu = () => {


            setShowMenu(!showMenu)

        }

  

  return (
    <div>
        <Container>
            <TitleContainer>
                <Menu onClick = {toggleMenu} >
                <Icon icon="ci:hamburger-md" color="white" width="30" height="30" />
                 
                 { showMenu && 


                    <DropdownMenuContainer>

                    <DropdownMenu>
                        <DropdownItem>
                        <img src={editTodoIcon} alt="edit todo" width="24" height="24"/>
                            Düzenle
                        </DropdownItem>
                        <DropdownItem onClick={() => onDelete(todo._id)}>
                        <img src={deleteTodoIcon} alt="delete todo" width="24" height="24"/>
                            Sil
                        </DropdownItem>
                    </DropdownMenu>
                    </DropdownMenuContainer>
                    }

                </Menu>
                <Title>
                    {todo.title}
                </Title>
            </TitleContainer>
            <ContentContainer>
                    
                <TaskList todoId = {todo._id}/>
                </ContentContainer>
                <AddTask todoId={todo._id}/>


    </Container>


    </div>
  )
}

export default NewTodo