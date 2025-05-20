import { RiArrowRightSLine } from '@remixicon/react'
import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col bg-blue-500 bg-cover bg-center rounded-lg md:flex-row flex-wrap px-6 md:px-10 lg:px-20' style={{ backgroundImage: `url(${assets.bg})` }}>
        
        {/* left side */}
        <div className="md:w-1/2 flex flex-col justify-center items-start gap-4 py-10 md:py-20 lg:py-28 md:mb-[-30px]">
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book an Appointment <br/> with a Doctor <span className='text-[#8ac926] animate-pulse transition duration-300'>Now</span></p>
            <div className='text-white text-sm md:text-base font-light'>
                <p>Wherever you are, making an appointment has never been easier.
                 Find your doctor, select desired time and schedule appointment, all from the comfort of your home.
                </p>
            </div>
            <a href="#speciality" className='flex items-center gap-2 bg-white text-gray-600 text-sm py-3 px-8 m-auto md:m-0 rounded-full font-semibold hover:scale-105 transition-all duration-300'>
                Book Appointment <RiArrowRightSLine className='w-4 mb-[-2px]'/>
            </a>
        </div>

        {/* right side */}
        <div className="md:w-1/2 relative">
            <img src={assets.header_img} alt="" className="w-full  md:absolute bottom-0 h-auto md:h-4/5 object-cover rounded-lg" />
        </div>
    </div>
  )
}

export default Header