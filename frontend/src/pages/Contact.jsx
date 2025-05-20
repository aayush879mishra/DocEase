import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
        <div>
        <h1 className=' text-gray-500 text-2xl font-medium text-center my-10'>CONTACT <span className='text-gray-700 '>US</span></h1>
        </div>
<div className='flex flex-col md:flex-row items-center gap-4 my-16 text-gray-900 md:mx-6'>
<div className='w-full md:w-1/2 flex flex-col items-center justify-center'>
          <img src={assets.contact} alt="" className='w-full h-72 object-cover md:h-96 rounded-lg' />
        </div>
        <div className='flex flex-col items-center justify-center my-10 md:w-1/2'>
            <p className='text-lg'>For any inquiries, please reach out to us at:</p>
            <p className='text-lg'>Email: <span className='text-blue-500'>docease@gmail.com</span></p>
            <p className='text-lg'>Phone: <span className='text-gray-600'>9845344521, 9845344522</span></p>
            <p className='text-lg'>Address: <span className='text-gray-600'>Baneshwor, Kathmandu</span></p>
            <p className='text-lg my-4'>We are here to help you!</p>
        </div>
</div>
        
        
    </div>
  )
}

export default Contact