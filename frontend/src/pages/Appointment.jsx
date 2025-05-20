import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { RiVerifiedBadgeFill, RiInfoCardFill } from '@remixicon/react'
import { toast } from 'react-toastify'
import axios from 'axios'


const Appointment = () => {

  const {docId} = useParams()
  const {doctors, token, backendURL, getDoctorData} = useContext(AppContext)
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    
  }

  const getAvailableSlots = async () => {
    if (!docInfo || !docInfo.slots_booked) return; 
    setDocSlots([])

    let today = new Date()
    for(let i = 0; i < 7; i++) {
      // get the date of the next 7 days
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // setting end time of the date with index 
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // setting hours
      if(today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      
      }

      let timeSlots = []

      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
        if(isSlotAvailable) {
          // add slot to the array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        }

        

        // increment the time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if(!token){
      toast.error('Please login to book an appointment')
      return navigate('/login')
    }

    try{
    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = day + "-" + month + "-" + year;

    const {data } = await axios.post(`${backendURL}/api/user/book-appointment`, {docId, slotDate, slotTime}, {
      headers: {
        token
      }
    })
    if(data.success) {
      toast.success(data.message)
      getDoctorData()
      navigate('/my-appointments')
    } else{
      toast.error(data.message)
    }
  }
  catch(error){
    console.log(error)
    toast.error(error.message)
  }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [docId, doctors])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  useEffect(() => {
    console.log("docSlots updated:", docSlots);

  }, [docSlots])
  return docInfo && (
    <div>
      {/* -- docInfo --*/}
      <div className='flex flex-col sm:flex-row  gap-5 mt-5'>
        <div>
          <img src={docInfo.image} alt=""  className='w-40 h-40 rounded-full object-cover'/>
        </div>
        <div className='flex-1 border border-gray-300 rounded-lg p-8 py-6 shadow-md bg-white mx-2 sm:mx-0 mt-[-10px] sm:mt-0'> 
          {/* -- docInfo : name, speciality,degree, experience --*/}
          <h1 className='flex items-center gap-2 text-2xl font-medium'>{docInfo.name} <RiVerifiedBadgeFill className='text-green-500 w-5'/></h1>
        
        <div className='flex gap-6 text-sm text-gray-600 mt-4'>
          <p>{docInfo.speciality}</p>
          <p>{docInfo.degree}</p>
          <p>{docInfo.experience} of experience</p>
        </div >
        {/* -- docInfo : about --*/}
        <p className='flex items-center font-medium gap-2 text-lg text-gray-900 mt-4'>About <RiInfoCardFill className=' w-5'/></p>
        <p className='mt-2 text-sm max-w-[700px] text-gray-600'>{docInfo.about} </p>
        {/* -- docInfo : fees --*/}
        <p className='mt-4 gap-2'>
        <span className='font-medium text-gray-900 text-lg'>Fees:</span> <span className='text-gray-600 text-sm'>₹{docInfo.fees}</span>
      </p>
      </div>
      
      </div>

      {/* --booking slots --*/}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-900'>
        <p>Select a date and time slot</p>
        <div className='flex items-center w-full overflow-x-scroll gap-4 mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div key={index} className={`text-center py-6 min-w-16 rounded-lg cursor-pointer transition-all duration-500 ${slotIndex === index ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"} hover:bg-blue-500 hover:text-white`} onClick={() => {setSlotIndex(index); }}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center w-full overflow-x-scroll gap-4 mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p key={index} className={`text-center text-sm font-light flex-shrink-0 py-2 px-4 rounded-lg cursor-pointer transition-all duration-500 ${slotTime === item.time ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"} hover:text-gray-500 border border-gray-300`} onClick={() => setSlotTime(item.time)}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-blue-500 text-sm font-light text-white px-12 py-3 rounded-full mt-8 hover:scale-105 transition-all duration-300'>Book Appointment</button>
      </div>
    </div>
  )
}

export default Appointment