import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const MyProfile = () => {

  const {userData, setUserData, token, backendURL, loadUserProfilData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()

      
      formData.append('name', userData.name)
      formData.append('address', userData.address)
      formData.append('phone', userData.phone)
      formData.append('dob', userData.dob)
      formData.append('gender', userData.gender)

      image && formData.append('image', image)

      const {data} = await axios.post(`${backendURL}/api/user/update-profile`, formData, {
        headers: {
          token
        }
      })
      if(data.success) {
        toast.success(data.message)
        setIsEdit(false)
        await loadUserProfilData()
        setImage(false)
      }
      else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.error("Error during update user profile:", error);
      toast.error(error.message);
    }
  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-3 p-4 text-sm'>

      {
        isEdit
        ? <label htmlFor='image'>
            <div className='inline-block relative cursor-pointer'>
              <img className='w-32 h-32 rounded-full object-cover opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-10 h-10 absolute bottom-12 right-12' src={image ? null : assets.profile_pic} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden/>
        </label>

      : 
      <img className='w-32 h-32 rounded-full object-cover' src={userData.image} alt="" />

      }
      

      {
        isEdit
        ? <input className='bg-gray-50 text-3xl font-medium text-neutral-800 mt-4' type='text' value={userData.name} onChange={(e) => setUserData(prev => ({...prev, name: e.target.value}))}/>
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-300 h-0.5 border-none'/>
      <div>
        <p className='font-medium text-lg text-neutral-600 mt-3'>CONTACT DETAILS</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-gray-600 mt-3'>
          <p className='font-medium'>Email Address: </p>
          <p>{userData.email}</p>
          <p className='font-medium'>Phone Number: </p>
          {
            isEdit
            ? <input className='max-w-52 bg-gray-100' type='text' value={userData.phone} onChange={(e) => setUserData(prev => ({...prev, phone: e.target.value}))}/>
            : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address: </p>
          {
            isEdit
            ? <input className='max-w-52 bg-gray-100' type='text' value={userData.address} onChange={(e) => setUserData(prev => ({...prev, address: e.target.value}))}/>
            : <p className='text-blue-400'>{userData.address}</p>
          }
          <p className='font-medium'>Gender: </p>
          {
            isEdit
            ? <select className='max-w-20 bg-gray-100' name='gender' value={userData.gender} onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            : <p>{userData.gender}</p>
          }
          <p className='font-medium'>Date of Birth: </p>
          {
            isEdit
            ? <input className='max-w-52 bg-gray-100' type='date' value={userData.dob} onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))}/>
            : <p >{userData.dob}</p>
          }
        </div>
        
      </div>
      <div>
          {
            isEdit
            ? <button className='bg-blue-200 text-gray-600 px-12 py-2 rounded-full mt-5 hover:bg-blue-300' onClick={updateUserProfileData}>Save</button>
            : <button className='bg-blue-200 text-gray-600 px-12 py-2 rounded-full mt-5 hover:bg-blue-300' onClick={() => setIsEdit(true)}>Edit</button>
          }
        </div>
    </div>
  )
}

export default MyProfile