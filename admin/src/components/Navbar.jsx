import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { RiAdminLine } from '@remixicon/react'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }
  return (
    <div className='flex justify-between items-center bg-white shadow-md border-b sm:px-10 p-4'>
        <div className='flex items-center gap-2'> 
            <RiAdminLine size={30} className='text-blue-500 cursor-pointer'/>
            <p className='border px-2.5 py-1 rounded-full border-gray-500 text-sm text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={handleLogout} className='border px-3 py-1 rounded-full border-gray-50 text-sm bg-blue-500 text-gray-100'>Logout</button>
    </div>
  )
}

export default Navbar