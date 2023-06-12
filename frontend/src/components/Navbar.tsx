
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import instance from '../api/axiosInstance';
import logo from '../icons/logo.png';
import AddTodo from './AddTodo';

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 10%;
  background-color: white;
  border-bottom: 1px solid #e5e5e5;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  margin-right: auto;
  img {
    width: 154px;
    height: 36px;
  }
`;
  

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
`;

const NavLink = styled.li`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;

 
  a {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;

    text-decoration: none;
    transition: all 0.3s ease 0s;

    &:hover {
      color: #0088a9;
    }
  }
`;






const Navbar = () => {

  const token = localStorage.getItem('token');


  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();

  };

  const [user, setUser] = useState<any>(null);


  useEffect(() => {
   
    const fetchUser = async () => {

       try {
         const res = await instance.get('/profile')
         setUser(res.data.user)
         console.log(res.data.user)
       } catch (error) {
            console.log(error)

       }
    }

     fetchUser();
     console.log(user)


  }, [
    
  ]);





  return (
    <Header>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
      <NavLinks>
        {user && user.username ? (
          <>
              <NavLink>
                <AddTodo />
            </NavLink>
            <NavLink >
              <Link to="/profile">{user.username}</Link>
            </NavLink>
            <NavLink >
              <Link to="/logout" onClick={logout}>Çıkış</Link>
            </NavLink>
        

          </>
        ) : (
          <>
            <NavLink>
              <Link to="/login">Giriş</Link>
            </NavLink>
            <NavLink>
                <Link to="/register">Kayıt</Link>
            </NavLink>
            <NavLink>
                <Link to="/profile">Profil</Link>
            </NavLink>
          </>
        )}
      </NavLinks>
    
      
    </Header>
  );
};

export default Navbar;
