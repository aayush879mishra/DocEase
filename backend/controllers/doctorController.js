import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available
        });
        res.status(200).json({
            success: true,
            message: 'Doctor availability changed successfully',
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email']);
        res.status(200).json({
            success: true,
            message: 'Doctor list fetched successfully',
            doctors
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

// api for login doctor
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const doctor = await doctorModel.findOne({ email });
        if(!doctor) {
            return res.status(400).json({ message: "Doctor not found" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if(isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.status(200).json({
                success: true,
                message: "Doctor logged in successfully",
                token
            })
        } else{
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}


// api to get appointment list for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const {docId}  = req.body;
        const appointments = await appointmentModel.find({ docId });
        res.status(200).json({
            success: true,
            message: 'Appointments fetched successfully',
            appointments
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

// api for mark appointment completed for doctor panel

const appointmentComplete = async(req, res) => {
    try {
        const {docId, appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true});
            return res.status(200).json({ message: "Appointment completed" });
        } else{
            return res.status(400).json({ message: "mark failed" });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

// api to cancel app for doc panel
const appointmentCancel = async(req, res) => {
    try {
        const {docId, appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});
            return res.status(200).json({ message: "Appointment cancelled" });
        } else{
            return res.status(400).json({ message: "mark failed" });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}


// api to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {
        const {docId}  = req.body;
        const appointments = await appointmentModel.find({ docId });
        
        let earning = 0;

        appointments.map((item) => {
            if(item.isCompleted) {
                earning += item.amount;
            }
        })

        let patients = []

        appointments.map((item) => {
            if(!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        })

        const dashData = {
            earning,
            patients: patients.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5),

        }

        res.status(200).json({
            success: true,
            message: 'Dashboard data fetched successfully',
            dashData
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

// api to get doctor profile to doctor panel
const doctorProfile = async (req, res) => {
    try {
        const {docId}  = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.status(200).json({
            success: true,
            message: 'Doctor profile fetched successfully',
            profileData
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

// api to update doctor profile

const updateDoctorProfile = async (req, res) => {
    try {
        const {docId, fees , address, available}  = req.body;
        await doctorModel.findByIdAndUpdate(docId, {fees, address, available})
        res.status(200).json({
            success: true,
            message: 'Doctor profile fetched successfully',

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}


export { changeAvailability ,doctorList , loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile}  // Exporting the functions for use in other files