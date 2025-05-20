import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        if(!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }

        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        };

        // save user to database
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// api for user login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const user = await userModel.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// api for getting user data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password');

        res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            userData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// update user profile
const updateProfile = async (req, res) => {
    try {
        const {userId, name, phone, address, dob, gender} = req.body;
        const imageFile = req.file;

        if(!name || !phone || !dob || !gender) {
            return res.status(400).json({ message: "Data is missing" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address, dob, gender });

        if(imageFile) {
            // upload img to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type:'image'
            });
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageURL });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// api to book an appointment
const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body;
        const userId = req.userId || req.body.userId;
        
        console.log("userId from body:", userId);
        const docData = await doctorModel.findById(docId).select('-password');
        if(!docData.available) {
            return res.status(400).json({ message: "Doctor not available" });
        }

        let slots_booked = docData.slots_booked

        if(slots_booked[slotDate]) {
            if(slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({ message: "Slot already booked" });
            } else{
                slots_booked[slotDate].push(slotTime);
            }
        
        } else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');
        console.log("userData:", userData);
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slots data in DocData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.status(200).json({
            success: true,
            message: "Appointment booked successfully",
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// api to get user appointments
const listAppointment = async (req, res) => {
    try {
        const {userId} = req.body;
        const appointments = await appointmentModel.find({ userId })
        res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            appointments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// api to cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId ,appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData.userId !== userId) {
            return res.status(400).json({ message: "You are not authorized to cancel this appointment" });
        }

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



export { registerUser , userLogin, getProfile ,updateProfile , bookAppointment, listAppointment, cancelAppointment };