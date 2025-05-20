import jwt from 'jsonwebtoken';

// admin auth
const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers
        if (!atoken) {
            return res.status(401).json({ message: "Unauthorized token" });
        }
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        if(decoded !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ message: "Unauthorized email" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorizeddd" });
    }
};

export default authAdmin;