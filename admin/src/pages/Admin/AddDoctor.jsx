import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

    const [docImg , setDocImg] = useState(false)
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [experience , setExperience] = useState('1 Year')
    const [fees , setFees] = useState('')
    const [speciality , setSpeciality] = useState('General Physician')
    const [degree , setDegree] = useState('')
    const [address , setAddress] = useState('')
    const [about , setAbout] = useState('')

    const {backendURL, aToken} = useContext(AdminContext)

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            if(!docImg){
                return toast.error('Please upload a doctor image')
            } 

            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', address)
            formData.append('about', about)

            // console log
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
            const {data} = await axios.post(`${backendURL}/api/admin/add-doctor`, 
                formData
            , {
                headers: {
                    aToken
                }
            })
            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setFees('')
                setDegree('')
                setAddress('')
                setAbout('')
            } else {
                console.log(data);
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
  return (
    <form onSubmit={onSubmit} className='m-5 w-full'>
        <p className='text-xl font-semibold mb-3'>Add Doctor</p>

        <div className='bg-white px-8 py-7 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
            <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor='doc-img'>
                    <img  alt=""  src={docImg? URL.createObjectURL(docImg) : assets.user_icon} className='text-gray-400 w-16 h-16 rounded-full cursor-pointer'/>
                </label>
                <input onChange={(e) => setDocImg(e.target.files[0]) }   type="file" id='doc-img' hidden/>
                <p>Upload Doctor Image</p>
            </div>

            <div className='flex flex-col items-start lg:flex-row gap-10 text-gray-600'>
                <div className='flex lg:flex-1 flex-col gap-4 w-full'>
                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Enter Doctor Name' className='border border-gray-300 rounded-md mt-1 px-4 py-2' required/>
                    </div>
                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter Doctor Email' className='border border-gray-300 rounded-md mt-1 px-4 py-2' required/>
                    </div>
                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter Doctor Password' className='border border-gray-300 rounded-md mt-1 px-4 py-2' required/>
                    </div>
                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Experience</p>
                        <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border border-gray-300 rounded-md mt-1 px-4 py-2'  >
                            <option value="1 Year">1 Year</option>
                            <option value="2 Year">2 Year</option>
                            <option value="3 Year">3 Year</option>
                            <option value="4 Year">4 Year</option>
                            <option value="5 Year">5 Year</option>
                            <option value="6 Year">6 Year</option>
                            <option value="7 Year">7 Year</option>
                            <option value="8 Year">8 Year</option>
                            <option value="9 Year">9 Year</option>
                            <option value="10 Year">10 Year</option>
                        </select>
                    </div>
                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor fees</p>
                        <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder='Enter Doctor Fees' className='border border-gray-300 rounded-md mt-1 px-4 py-2' required/>
                    </div>
                    
                </div>
                <div className='flex lg:flex-1 flex-col gap-4 w-full'>
                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Doctor Specialization    </p>
                        <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border border-gray-300 rounded-md mt-1 px-4 py-2' >
                            <option value="General Physician">General Physician</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>
                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Education</p>
                        <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder='Enter Doctor Education' className='border border-gray-300 rounded-md mt-1 px-4 py-2' required/>
                    </div>
                    <div className='flex flex-1 flex-col gap-1'>
                        <p>Address</p>
                        <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder='Enter Doctor Address' className='border border-gray-300 rounded-md mt-1 px-4 py-2' required/>
                    </div>
                </div>
            </div>
            <div>
                <p className='mt-4 mb-2'>Doctor Description</p>
                <textarea onChange={(e) => setAbout(e.target.value)} value={about} cols="30" rows="10" placeholder='Enter Doctor Description' className='w-full border border-gray-300 rounded-md mt-1 px-4 py-2' required/>
            </div>
            <button type='submit' className='border border-gray-300 rounded-full bg-blue-600 text-gray-100 mt-1 px-5 py-2'>Add Doctor</button>
        </div>
    </form>
  )
}

export default AddDoctor