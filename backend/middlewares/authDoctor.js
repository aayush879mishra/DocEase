import jwt from 'jsonwebtoken';

// doctor auth
const authDoctor = async (req, res, next) => {
    try {
        const {dtoken} = req.headers
        if (!dtoken) {
            return res.status(401).json({ message: "Unauthorized token" });
        }
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
              
        // Ensure req.body exists
        if (!req.body) req.body = {};
        req.body.docId = decoded.id;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: error.message });
    }
};

export default authDoctor;