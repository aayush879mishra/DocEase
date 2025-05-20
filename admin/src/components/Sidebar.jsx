import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { RiAddCircleLine, RiCalendarTodoLine, RiGroupLine, RiHome2Line } from '@remixicon/react'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

    const { aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)
  return (
    <div className='bg-white  min-w-[160px] h-screen shadow-lg flex flex-col items-center py-2'>
        {
            aToken && <ul className='text-gray-600 '>
                <NavLink className={ ({isActive}) =>   `flex items-center gap-2 px-2 py-2 md:px-8 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 ' : ''}`} to='/admin-dashboard'>
                    <RiHome2Line/>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink className={ ({isActive}) =>   `flex items-center gap-2 px-2 py-2 md:px-8 md:min-w-72 cursor-pointer mt-4 ${isActive ? 'bg-gray-300 ' : ''}`} to='/all-appointments'>
                    <RiCalendarTodoLine/>
                    <span>Appointments</span>
                </NavLink>
                <NavLink className={ ({isActive}) =>   `flex items-center gap-2 px-2 py-2 md:px-8 md:min-w-72 cursor-pointer mt-4 ${isActive ? 'bg-gray-300 ' : ''}`} to='/add-doctor'>
                    <RiAddCircleLine/>
                    <span>Add Doctor</span>
                </NavLink>
                <NavLink className={ ({isActive}) =>   `flex items-center gap-2 px-2 py-2 md:px-8 md:min-w-72 cursor-pointer mt-4 ${isActive ? 'bg-gray-300 ' : ''}`} to='/doctor-list'>
                    <RiGroupLine/>
                    <span>Doctors List</span>
                </NavLink>
            </ul>
        }
         {
            dToken && <ul className='text-gray-600 '>
                <NavLink className={ ({isActive}) =>   `flex items-center gap-2 px-2 py-2 md:px-8 md:min-w-72 cursor-pointer ${isActive ? 'bg-gray-300 ' : ''}`} to='/doctor-dashboard'>
                    <RiHome2Line/>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink className={ ({isActive}) =>   `flex items-center gap-2 px-2 py-2 md:px-8 md:min-w-72 cursor-pointer mt-4 ${isActive ? 'bg-gray-300 ' : ''}`} to='/doctor-appointments'>
                    <RiCalendarTodoLine/>
                    <span>Appointments</span>
                </NavLink>
                
                <NavLink className={ ({isActive}) =>   `flex items-center gap-2 px-2 py-2 md:px-8 md:min-w-72 cursor-pointer mt-4 ${isActive ? 'bg-gray-300 ' : ''}`} to='/doctor-profile'>
                    <RiGroupLine/>
                    <span>Profile</span>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar