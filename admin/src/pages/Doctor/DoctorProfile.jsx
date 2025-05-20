import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import  { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const {dToken, profileData, getProfileData, setProfileData,backendURL} = useContext(DoctorContext)
  

  const [isEdit, setIsEdit] = useState(false)

  const UpdateProfile = async () => {
    try {
      const updateData = {
        adress: profileData.adress,
        phone: profileData.fees,
        available: profileData.available,
      }

      const { data } = await axios.post(backendURL + '/api/doctor/update-profile', updateData, {
        headers: {
          dToken
        }
      })
      if (data.success) {
        setIsEdit(false)
        getProfileData()
        toast.success(data.message)
        
        console.log(data.profileData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [dToken])
  return profileData && (
    <div>
      <div className='flex flex-col m-4 gap-5'>
        <div>
          <img className='w-28 h-28 object-cover rounded-full' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 bg-white border border-stone-200 p-8 py-7'>
          <p className='text-2xl text-gray-800 font-semibold '>Name : {profileData.name}</p>
          <div className='flex gap-3 mt-2 text-gray-600 items-center'>
          <p>Speciality : {profileData.speciality}</p>
          <p>Experience : {profileData.experience}</p>
          <p>Degree: {profileData.degree}</p>
          </div>
          
          <div className='mt-2 mb-3'>
            <p className='font-semibold'>About: </p>
            <p className='text-gray-600 text-sm'>{profileData.about}</p>
          </div>

          <p className='text-gray-600'>Appointment Fees : <span className='font-semibold text-gray-800'>Rs. {isEdit ? <input type='number' value={profileData.fees} onChange={(e) => setProfileData(prev => ({...prev, fees: e.target.value}))}/> : profileData.fees}</span></p>
          <p className='text-gray-600'>Adress: {isEdit ? <input type='text' value={profileData.address} onChange={(e) => setProfileData(prev => ({...prev, address: e.target.value}))}/> : profileData.address}</p>

          <div className='flex gap-2 pt-2'>
            <input onChange={() =>isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type='Checkbox' />
            <label>Available</label>
          </div>


{
  isEdit 
  ? <button onClick={UpdateProfile} className='bg-blue-500 text-white px-3 py-1 rounded-full mt-2 hover:scale-105 transition-all duration-300'>save</button>
   : <button onClick={() => setIsEdit(true)} className='bg-blue-500 text-white px-3 py-1 rounded-full mt-2 hover:scale-105 transition-all duration-300'>Edit</button>
}
          
        </div>
      </div>

    </div>
  )
}

export default DoctorProfile