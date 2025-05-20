import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {

    const [state , setState] = useState('Admin')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const {setAToken, backendURL } = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            if(state === 'Admin'){
                const {data} = await axios.post(`${backendURL}/api/admin/login`, {
                    email,
                    password
                })
                if(data.success){
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token);
                    console.log(data.token);     
                    
                } else {
                    toast.error(data?.message)
                }
            } else {
                const {data} = await axios.post(`${backendURL}/api/doctor/login`, {
                    email,
                    password
                })
                if(data.success){
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token);
                    console.log(data.token);     
                    
                } else {
                    toast.error(data?.message)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }

    }

  return (
    
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-lg shadow-md text-gray-600 text-sm'>
            <p className='font-semibold text-lg m-auto'><span className='text-blue-500'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full border border-gray-300 rounded-md mt-1 px-4 py-2' type="email" placeholder='Enter your email' required/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full border border-gray-300 rounded-md mt-1 px-4 py-2' type="password" placeholder='*********' required/>
            </div>
            <button className='w-full bg-blue-500 text-white rounded-md mt-3 px-4 py-2' type='submit'>Login</button>

            {
                state === 'Admin' ? <p className='text-sm mt-1'>Not an admin? <span className='text-blue-500 cursor-pointer underline' onClick={() => setState('Doctor')}>Login as Doctor</span></p> : 
                <p className='text-sm mt-1'>Not a doctor? <span className='text-blue-500 cursor-pointer underline' onClick={() => setState('Admin')}>Login as Admin</span></p>
            }
        </div>
    </form>
  )
}

export default Login