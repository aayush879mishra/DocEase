import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

  const { backendUrl, token, getDoctorData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          token
        }
      })
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      } 
    } catch (error) {
      console.error('Error fetching user appointments:', error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment/`,{appointmentId}, {
        headers: {
          token
        }
      })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error canceling appointment:', error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
        <p className='text-2xl text-zinc-700 pb-3 mt-12 border-b font-medium'>My Appointments</p>
        <div>
          {appointments.slice(0, 3).map((item, index) => (
              <div key={index} className="grid grid-cols-[1fr_2fr] gap-3 border-b py-3 sm:gap-5 sm:flex">
                <div>
                  <img className='w-32 h-32 rounded object-cover' src={item.docData.image} alt=""  />
                </div>
                <div className='flex-1 text-sm gap-1'>
                  <p className='font-semibold text-neutral-800'>{item.docData.name}</p>
                  <p className='text-zinc-600 text-xs'>{item.docData.speciality}</p>
                  <p className='text-zinc-700 font-medium my-2'>Address: <span className='font-normal text-zinc-500 text-xs'>{item.docData.address}</span></p>
                  <p className='font-normal text-zinc-500 text-xs'><span className='text-zinc-800 text-sm'>Data and Time: </span> {item.slotDate} | {item.slotTime}</p>
                </div>
                <div></div>
                <div className='flex flex-col justify-end gap-2'>
                  {!item.cancelled && <button className='text-sm text-center sm:min-w-48 py-2 border bg-blue-100 text-zinc-800 hover:bg-blue-200 hover:text-zinc-600 transition-all duration-300'>Pay fees</button>}
                  {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-center sm:min-w-48 py-2 border bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 transition-all duration-300'>Cancel Appointment</button>}
                  {item.cancelled && <button className='text-sm text-center sm:min-w-48 py-2 border bg-red-800 text-red-50 '>Cancelled</button>}
                </div>
              </div>
          ))}
        </div>
    </div>
  )
}

export default MyAppointments