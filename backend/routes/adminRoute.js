import express from "express";
import { addDoctor, adminLogin, getAllDoctors , appointmentsAdmin, appointmentCancel, adminDashboard} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

// Route for adding a doctor
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
// Route for admin login
adminRouter.post("/login", adminLogin);
adminRouter.get("/all-doctors", getAllDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter;