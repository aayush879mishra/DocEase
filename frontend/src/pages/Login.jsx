import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {setToken, token, backendURL} = useContext(AppContext );
  const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    
    try {
      if(state === 'Sign Up') {
        const {data} = await axios.post(`${backendURL}/api/user/register`, {name, email, password});
        if(data.success) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
        } else {
          toast.error(data.message);
        }

      }else{
        const {data} = await axios.post(`${backendURL}/api/user/login`, {email, password});
        if(data.success) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(token) {
      navigate('/');
    }
  }, [token])
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center '>
      <div  className='flex flex-col items-start m-auto p-8 min-w-[400px] sm:min-w-96 border border-gray-200 rounded-lg shadow-lg text-zinc-600 text-sm  gap-4'>
        <p className='text-2xl font-medium'>{state === 'Sign Up' ? 'Sign Up' : 'Login'}</p>
        <p className='text-sm text-gray-600'>Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to book an appointment</p>

        {
          state === 'Sign Up' && 
          <div className='w-full'>
          <p>Full Name</p>
          <input className='w-full border border-gray-300 rounded-md px-4 py-2 mt-1' type="text" placeholder='Mohan Shrestha' value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>
        }
        
          <div className='w-full'>
          <p>Email</p>
          <input className='w-full border border-gray-300 rounded-md px-4 py-2 mt-1'  type="email" placeholder='abc@.com' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className='w-full'>
          <p>Password</p>
          <input className='w-full border border-gray-300 rounded-md px-4 py-2 mt-1'  type="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <div/>
          <button onClick={onSubmitHandler} type='submit' className='bg-blue-500 text-gray-50 w-full px-12 py-2 rounded-full mt-6 hover:bg-blue-600'>{state === 'Sign Up' ? 'Sign Up' : 'Login'}</button>

          {
            state === 'Sign Up' 
            ? <p className='text-sm text-gray-600 mt-4'>Already have an account? <span onClick={() => setState('Login')} className='text-blue-500 hover:text-blue-600 underline cursor-pointer'>Login</span></p> 
            : <p className='text-sm text-gray-600 mt-4'>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-blue-500 hover:text-blue-600 underline cursor-pointer'>Sign Up</span></p>
          }
        </div>
      </div>
    </form>
  )
}

export default Login