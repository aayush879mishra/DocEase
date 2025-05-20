import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { RiCloseLargeLine, RiCheckDoubleLine } from '@remixicon/react'

const DoctorAppointments = () => {

    const {dToken, appointments, getAppointments , cancelAppointment, completeAppointment} = useContext(DoctorContext)
    const {calculateAge} = useContext(AppContext)
   
    useEffect(() => {
        if(dToken)
        getAppointments()
    }, [dToken])
    

  return (
    <div className='w-full max-w-6xl m-5'>
        <h1 className='text-lg font-medium mb-3'>Doctor Appointments</h1>

        <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[70vh] overflow-scroll'>
            <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
                <p>#</p>
                <p>Patient</p>
                <p>Payment</p>
                <p>Age</p>
                <p>Date and time</p>
                <p>Fees</p>
                <p>Actions</p>
            </div>

            {
                appointments.reverse().map((item, index)=>(
                    <div key={index} className="flex flex-wrap justify-between max-sm:gap-4 max-sm:text-base sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-slate-200">
                        <p className='max-sm:hidden'>{index+1}</p>
                        <div className='flex items-center gap-2'>
                            <img className='h-10 w-10 rounded-full object-cover' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
                        </div>
                        <div>
                            <p>{item.payment}</p>
                        </div>
                        <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                        <p>{item.slotDate} , {item.slotTime}</p>
                        <p>{item.amount}</p>

                        {
                            item.cancelled 
                            ? <p className='text-red-500 text-xs'>Cancelled</p>
                            : item.isCompleted 
                              ? <p className='text-green-500 text-xs'>Completed</p>
                              : <div className='flex items-center gap-2'>
                              <RiCloseLargeLine onClick={() => cancelAppointment(item._id)} className='w-10 border border-red-400 p-1 rounded-full cursor-pointer'/>
                              <RiCheckDoubleLine onClick={() => completeAppointment(item._id)} className='w-10 border border-green-400 p-1 rounded-full cursor-pointer'/>
                              </div>
                        }
                        
                    </div>

                ) )
            }
        </div>
    </div>
  )
}

export default DoctorAppointments