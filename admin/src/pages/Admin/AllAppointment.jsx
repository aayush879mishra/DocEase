import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import {RiCloseLargeLine} from "@remixicon/react"

const AllAppointment = () => {

  const {aToken, appointments , getAllAppointments, cancelAppointment} = useContext(AdminContext)
  const {calculateAge} = useContext(AppContext)

  useEffect(() => {
    if(aToken){
      getAllAppointments()
    }
  },[aToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='text-lg font-medium mb-3'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[70vh] overflow-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {
          appointments.map((item, index) => (
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-slate-200'>
              <p className='max-sm:hidden'>{index + 1}</p>

              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>
              
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{item.slotDate} , {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full object-cover' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
              </div>
              <p>Rs. {item.amount}</p>
              {
                item.cancelled 
                ? <p className='text-red-500'>Cancelled</p>
                : item.isCompleted 
                ? <p className='text-green-500'>Completed</p>
                :  <RiCloseLargeLine onClick={() => cancelAppointment(item._id)} className='w-10 border border-red-400 p-1 rounded-full cursor-pointer'/>
              }
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllAppointment