/*
import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        next();

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;
*/
// middleware/auth.js
import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    try {
        // Debug logging
        console.log('Auth Headers:', req.headers.authorization);
        console.log('Token Header:', req.headers.token);
        
        // Prefer standard Authorization header but also allow custom 'token' header
        const authHeader = req.headers.authorization || '';
        const tokenFromAuth = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        const token = tokenFromAuth || req.headers.token || req.header('token');

        console.log('Extracted Token:', token ? token.substring(0, 20) + '...' : 'No token found');

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token Decoded:', tokenDecode);
        
        if (!tokenDecode || !tokenDecode.id) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
        }

        // Attach user id (and optionally whole decoded payload) to req, not to req.body
        req.userId = tokenDecode.id;
        req.user = tokenDecode; // optional, useful if you need more fields later

        console.log('Auth successful, calling next(), userId:', req.userId);
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default userAuth;
