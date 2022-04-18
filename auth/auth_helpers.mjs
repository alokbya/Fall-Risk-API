import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import * as blacklist from '../models/blacklist_model.mjs';

dotenv.config();

const verifyToken = async (req, res, next) => {
    if (req.user !== undefined) {
        return next();
    }
    const token = req.cookies.session;
    if (!token) {
        return res.status(403).json({ Error: 'A token is required for authentication' });
    }
    try {
        const matchingToken = await blacklist.GetToken({ token });
        if (matchingToken.length > 0) {
            return res.status(403).json({ Error: 'A token is required for authentication' }); 
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(403).json({ Error: "Token expired" });
            return;
        } else {
            console.error(error);
            res.status(500).json({ Error: `${error}`});
            return;
        }        
    }
}

const destroyToken = async (req, res, next) => {
    const userToken = req.cookies.session;
    await blacklist.AddToken(userToken)
        .then(addedToken => {
            console.log(`Blacklisted token: ${addedToken}`);
        })
        .catch(error => {
            console.error(error);
        });
    return next();
}

const encryptPassword = async (password) => {
    const SALT = 10;
    return await bcrypt.hash(password, SALT);
}

const generateToken = (userObj) => {
    return jwt.sign(
        {   user_id: userObj.user._id, 
            email: userObj.email, 
            first_name: userObj.first_name, 
            last_name: userObj.last_name, 
            title: userObj.title, 
            units: userObj.user.units, 
            orgs: userObj.user.orgs },
        process.env.TOKEN_KEY,
        {
            expiresIn: '1h',
        },
    );
}

export { verifyToken, destroyToken, encryptPassword, generateToken };