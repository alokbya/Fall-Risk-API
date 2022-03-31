import { application } from "express";
import * as users from '../models/users_model.mjs';
import * as blacklist from '../models/blacklist_model.mjs';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { destroyToken } from '../auth/auth_helpers.mjs';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {first_name, last_name, email, title, password } = req.body;

        // validate user input (400)
        if (!(first_name && last_name && email && password)) {
            req.status(400).json({ Error: 'All inputs are required' });
        }

        // check if user exists (409)
        const old_user = await users.GetUser({ email });
        if (old_user.length !== 0) {
            return res.status(409).json({ Error: 'User already exists' });
        }

        // encrypt password (hash & salt password)
        const e_pass = await bcrypt.hash(password, 10);
        
        // create new user
        const user = await users.AddUser({ first_name, last_name, email, title, password: e_pass });
        const user_client = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            title: title,
            units: user.units,
        };

        // create signed token
        const token = jwt.sign(
            { user_id: user._id, email, first_name, last_name, title, units: user.units },
            process.env.TOKEN_KEY,
            {
                expiresIn: '1h',
            },
        );

        user.token = token;

        // set token cookie (JWT)
        res.cookie('session', token).status(201).json(user_client);

    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: `${error}` });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate user input
        if (!(email && password)) {
            res.status(400).json({ Error: 'All inputs are required' });
        }

        // validate user exists
        const user = await users.GetUser({ email });
        if (user.length === 0) {
            res.status(401).json({ Error: 'Invalid username or password' });
        }

        const parsed_user = JSON.parse(JSON.stringify(user))[0];
        const user_client = {
            first_name: parsed_user.first_name,
            last_name: parsed_user.last_name,
            email: parsed_user.email,
            title: parsed_user.title,
            units: parsed_user.units,
        };

        if (user && await bcrypt.compare(password, parsed_user.password)) {
            // create token
            const token = jwt.sign(
                { user_id: parsed_user._id, email: parsed_user.email, first_name: parsed_user.first_name, last_name: parsed_user.last_name, title: parsed_user.title, units: parsed_user.units },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '1h',
                },
            );

            // save user token
            user.token = token;
            
            // set token cookie (JWT)
            res.cookie('session', token).status(200).json(user_client);
        } else {
            res.status(401).json({ Error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: `${error}` });
    }
});

router.post('/logout', destroyToken, async (req, res) => {
    try {
        const filter = { token: req.cookies.session };
        blacklist.GetToken(filter)
            .then(token => {
                if (token.length > 0) {
                    res.clearCookie('session');
                    res.status(200).json({ Status: `JWT token blacklisted: ${token}`});
                } else {
                    res.status(404).json({Status: 'JWT not found in blacklist'});
                }
            })
            .catch(error => {
                res.status(500).json({ Error: `${error}`});
            })
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: `${error}`});
    }
});

export { router };