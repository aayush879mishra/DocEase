import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const {getAllDoctor,aToken, doctors, changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if(aToken){
      getAllDoctor()
    }
  }, [aToken])
  return (
    <div className='m-5 overflow-scroll max-h-[90vh]'>
      <p className='text-lg font-medium'>All Doctors</p>
      <div className='w-full flex flex-wrap gap-5 pt-5 gap-y-5'>
        {
          doctors.map((item, index) => (
            <div className='border bg-white border-blue-200 max-w-56 rounded-xl overflow-hidden cursor-pointer group' key={index}>
              <img className='h-56 w-44 group-hover:scale-105 transition-all duration-300 object-cover' src={item.image} alt="" />
              <div className='p-3'>
                <p className='font-medium text-neutral-800'>{item.name}</p>
                <p className='text-sm text-neutral-600'>{item.speciality}</p>
                <div className='flex items-center gap-2 text-sm mt-2'>
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList