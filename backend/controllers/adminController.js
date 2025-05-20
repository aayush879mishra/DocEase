import bcrypt from 'bcrypt';
import validator from 'validator';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';


// Api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file

        // checking all data
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // validate email
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Please enter a valid email" });
        }

        // validate password
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });
        const imageUrl = imageUpload.secure_url;

        // create doctor object
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            date: Date.now()
        };

        // save doctor to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        res.status(201).json({ success: true, message: "Doctor added successfully"});

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });    
    }
}

// api for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            
            const token = jwt.sign( email, process.env.JWT_SECRET);
            return res.status(200).json({ success: true, message: "Login successful", token });
        } else {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}

// api for getting all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// api to get all apointment list

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// api for appointment cancel

const appointmentCancel = async (req, res) => {
    try {
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

       

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});

        // releasing doc slot
        const {docId, slotDate, slotTime} = appointmentData;

        const doctorData = await doctorModel.findById(docId).select('-password');

        let slots_booked = doctorData.slots_booked;

            slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
        

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.status(200).json({
            success: true,
            message: "Appointment canceled successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// api to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const users = await userModel.find({})
        const doctors = await doctorModel.find({})
        const appointments = await appointmentModel.find({});

        const dashData = {
            users: users.length,
            doctors: doctors.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5),
        }
        res.status(200).json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addDoctor, adminLogin ,getAllDoctors , appointmentsAdmin, appointmentCancel, adminDashboard};