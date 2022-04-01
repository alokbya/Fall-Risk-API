import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import * as blacklist from '../models/blacklist_model.mjs';

dotenv.config();

const verifyToken = async (req, res, next) => {
    // const token = req.cookies.session;
    // if (!token) {
    //     return res.status(403).json({Error: 'A token is required for authentication'});
    // }
    // try {
    //     const matchingToken = blacklist.GetToken({ token });
    //     if (matchingToken.length > 0) {
    //         return res.status(403).json({Error: 'A token is required for authentication'}); 
    //     }

    //     const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    //     req.user = decoded;
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({Error: `${error}`});
    // }
    // return next();
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
        console.error(error);
        res.status(500).json({ Error: `${error}`});
    }
    return next();
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

export { verifyToken, destroyToken };