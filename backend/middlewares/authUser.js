import jwt from 'jsonwebtoken';

// user auth
const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return res.status(401).json({ message: "Unauthorized token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
              
        req.userId = decoded.id;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: error.message });
    }
};

export default authUser;