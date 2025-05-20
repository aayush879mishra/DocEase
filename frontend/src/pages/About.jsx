import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center my-10'>
      <div >
        <p className='text-2xl font-medium text-gray-500'>ABOUT <span className='text-gray-700 '>US</span></p>
      </div>
      <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <p className='sm:w-2/3 text-center text-sm'>Welcome to DocEase, We are a team of dedicated professionals committed to providing the best healthcare services to our patients. Our mission is to make healthcare accessible and affordable for everyone.</p>
        <p className='sm:w-2/3 text-center text-sm'>Our platform connects patients with top doctors, making it easy to book appointments and receive quality care.</p>
        <p className='sm:w-2/3 text-center text-sm'>We believe in transparency, integrity, and compassion in all our interactions.</p>
        <p className='sm:w-2/3 text-center text-sm'>Thank you for choosing us for your healthcare needs.</p>
      </div>
      
    </div>
  )
}

export default About