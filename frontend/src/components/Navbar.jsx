import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { RiArrowDownSFill , RiMenu2Line, RiCloseLine } from '@remixicon/react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const navigate = useNavigate();

    const {token, setToken, userData} = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    }

  return (
    <div className='flex justify-between items-center text-sm py-4  border-b border-gray-400'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-50 h-14 cursor-pointer' />
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to="/">
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to="/doctors">
                <li className='py-1'>All Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to="/about">
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to="/contact">
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className="flex items-center gap-4">
            {
                token && userData ? <div className='flex items-center gap-2 cursor-pointer group relative' >
                    <img src={userData.image} alt="" className="w-8 h-8 object-cover rounded-full" />
                    <RiArrowDownSFill className='w-3.5'/>
                    <div className='absolute top-0 right-0 shadow-lg rounded-md pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className="min-w-48 bg-slate-100 rounded p-4 flex flex-col gap-2">
                            <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div> : 
                <button onClick={() => navigate('/login')} className='bg-blue-500 text-white py-2 px-8 rounded-full font-light hidden md:block'>Create Account</button>
            }
            <RiMenu2Line onClick={() => setShowMenu(true)} className='w-6 cursor-pointer md:hidden'/>
                {/* -- mobile menu -- */}
                <div className={`md:hidden  top-0 right-0 bottom-0 overflow-hidden bg-slate-100 z-20 transition-all ${showMenu ? "fixed w-3/5 h-[70%]" : "hidden"}`} onClick={() => setShowMenu(false)}>
                    <div className='flex items-center justtify-between px-5 py-6'>
                        <img className='w-32' src={assets.logo} alt="" />
                        <RiCloseLine  onClick={() => setShowMenu(false)} className='w-6 cursor-pointer absolute top-5 right-5'/>
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 text-lg font-medium px-5'>
                        <NavLink  onClick={()=> setShowMenu(false)} to='/'><p className='px-24 py-2 inline-block'>Home</p></NavLink>
                        <NavLink  onClick={()=> setShowMenu(false)} to='/doctors'><p className='px-24 py-2 inline-block'>All Doctors</p></NavLink>
                        <NavLink  onClick={()=> setShowMenu(false)} to='/about'><p className='px-24 py-2 inline-block'>About</p></NavLink>
                        <NavLink  onClick={()=> setShowMenu(false)} to='/contact'><p className='px-24 py-2 inline-block'>Contact</p></NavLink>
                    </ul>
                    </div>
            
        </div>
    </div>
  )
}

export default Navbar