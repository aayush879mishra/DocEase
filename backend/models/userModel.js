import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1746436519~exp=1746440119~hmac=09572fd4835e20dccc3ef477e7bffc9f8900b5f55b698104e275653a839d1f29&w=900",
    },
    
   
    address: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        default: "Not selected",
    },
    dob: {
        type: String,
        default: "Not selected",
    },
    phone: {
        type: String,
        default: "0000000000",
    },
    
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;

