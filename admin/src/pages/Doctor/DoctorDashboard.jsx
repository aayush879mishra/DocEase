import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { RiCheckDoubleLine, RiContractLine, RiParentLine, RiMoneyRupeeCircleLine , RiCloseLargeLine } from '@remixicon/react'

const DoctorDashboard = () => {

    const { dToken,setDashData, dashData, getDashData, cancelAppointment , completeAppointment} = useContext(DoctorContext)

    useEffect(() => {
        if(dToken){
            getDashData()
        } 
    }, [dToken])
  return dashData && (
    <div className='m-5'>
        <div className='flex flex-wrap gap-4'>
        <div className='flex gap-2 items-center bg-white p-3 rounded cursor-pointer hover:scale-105 transition-all duration-300'>
          <RiMoneyRupeeCircleLine/>
          <div>
            <p className='text-2xl font-semibold text-gray-600'>{dashData.earning}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex gap-2 items-center bg-white p-3 rounded cursor-pointer hover:scale-105 transition-all duration-300'>
          <RiContractLine/>
          <div>
            <p className='text-2xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex gap-2 items-center bg-white p-3 rounded cursor-pointer hover:scale-105 transition-all duration-300'>
          <RiParentLine/>
          <div>
            <p className='text-2xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div>
              <div className='px-4 py-4 mt-10 border bg-slate-200 '>
                <p className='text-lg font-medium'>Latest Bookings</p>
              </div>
              <div className='pt-4 border border-t-0'>
                {
                  dashData.latestAppointments.map((item, index) => (
                    <div className='flex items-center justify-between px-4 py-2 hover:bg-slate-100' key={index}>
                      <div className='flex items-center gap-2'>
                        <img className='w-10 h-10 rounded-full object-cover' src={item.userData.image} alt="" />
                        <div className='flex-1 text-sm'>
                          <p className='font-medium text-gray-600'>{item.userData.name}</p>
                          <p className='text-xs text-gray-400'>{item.slotDate}</p>
                        </div>
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
                     </div>)) 
                }
              </div>
            </div>
    </div>
  )
}

export default DoctorDashboard