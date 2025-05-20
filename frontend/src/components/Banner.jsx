import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className='flex items-center sm:flex-row flex-col justify-between py-6 px-5 md:px-10'>
        <div className='w-1/2  '>
            <img src={assets.bannerimg} alt="" className='w-[500px] '/>
        </div>
        <div>
            <div className='flex flex-col items-center gap-3 my-10 text-gray-900 md:mx-10'>
                <h1 className='text-3xl font-medium'>Let us take care of your health</h1>
                <p className='sm:w-2/3 text-center text-sm'>Choose from our list of top doctors, to book an appointment</p>
                <button onClick={() => {navigate('/login'); scrollTo(0, 0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-8 hover:scale-105 transition-all duration-300'>Create Account</button>
            </div>
        </div>
    </div>
  )
}

export default Banner