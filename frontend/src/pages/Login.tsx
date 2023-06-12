import React from "react";
import "../index.css"
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { InternalAxiosRequestConfig } from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import instance from "../api/axiosInstance";



const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e: any) => {
   
    if (!user.email || !user.password) {
      return;
    }
    
    try {

      setLoading(true);
     
      await instance.post("/login",(user)
      ).then((res) => {
     
        setLoading(false);   
       if (res.data) {
        console.log(res.data)
        setSuccess(true);
        const token = res.data.token;
         localStorage.setItem("token",token)
      
      
       }
      } );

        

    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);

    }

     
  };


  useEffect(() => {

    if (success || localStorage.getItem('token')) {
      navigate('/dashboard');
    }

  }
  ,[success,navigate]);

  
  return (
    <>
    
    {loading && (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader color="#3B82F6" />
      </div>
    )
    }
   
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
    
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email" onChange={handleChange}
              value={user.email}
              name = "email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password" onChange={handleChange}
              value={user.password}
              name = "password"
            />
          </div>
          <div className="flex items-center justify-between">
            
            <input type = "button" className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              value = "Login" onClick={handleSubmit}
            />


            

        
           
          </div>
       
      </div>
    </div>
    </>
  );
};

export default Login;
