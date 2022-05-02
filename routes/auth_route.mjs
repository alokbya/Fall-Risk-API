import { application } from "express";
import * as users from '../models/users_model.mjs';
import * as blacklist from '../models/blacklist_model.mjs';
import * as orgs_model from '../models/orgs_model.mjs';
import * as units from '../models/units_model.mjs';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { destroyToken, verifyToken, encryptPassword, generateToken } from '../auth/auth_helpers.mjs';
import {ObjectId} from 'mongodb';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    try {

        const {first_name, last_name, email, title, password, org_id } = req.body;

        if (!ObjectId.isValid(org_id)) {
            return res.status(406).json({ Error: 'Invalid Organization ID'});
        }
        let joinOrg = await orgs_model.GetOrg({ _id: org_id });
        if (joinOrg.length === 0) {
            return res.status(400).json({ Error: 'Organization not found'});
        }
        
        // validate user input (400)
        if (!(first_name && last_name && email && password)) {
            res.status(400).json({ Error: 'All inputs are required' });
        }

        // check if user exists (409)
        const old_user = await users.GetUser({ email });
        if (old_user.length !== 0) {
            return res.status(409).json({ Error: 'User already exists' });
        }

        // encrypt password (hash & salt password)
        const e_pass = await encryptPassword(password);
        
        // get today's date
        const date = new Date();
        // create new user
        let user = await users.AddUser({ first_name, last_name, email, title, password: e_pass, dateCreated: date });

        // create user's org
        // const org = await orgs_model.AddOrg({
        //     name: `${first_name}'s org`,
        //     dateCreated: date,
        //     admins: [user._id],
        //     owner: user._id, // add users prop
        // });

        // const userOrgs = [...user.orgs, org];
        const userOrgs = [...user.orgs];


        if (joinOrg.length > 0) {
            joinOrg = JSON.parse(JSON.stringify(joinOrg))[0]
            orgs_model.UpdateOrg({ _id: org_id}, { users: [...joinOrg.users, user]}, { new: true });
            userOrgs.push(joinOrg);
        }

        // update user with new org
        user = await users.UpdateUser({ _id: user._id }, {orgs: userOrgs }, { new: true })
        
        // create signed token
        const token = generateToken({
            user: {
                _id: user._id,
                units: user.units,
                orgs: user.orgs,
            },
            email: email,
            title: title,
            first_name: first_name,
            last_name: last_name,
        });

        user.token = token;

        // set token cookie (JWT)
        // res.set({'Session-Token': token});  // header
        res.cookie('session', token, { httpOnly: false }).status(201).json({
            user_id: user._id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            title: title,
            units: user.units,
            orgs: joinOrg,
        });

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
            return;
        }

        // validate user exists
        const user = await users.GetUser({ email });
        if (user.length === 0) {
            res.status(401).json({ Error: 'Invalid username or password' });
            return;
        }

        const parsed_user = JSON.parse(JSON.stringify(user))[0];
        const orgs = await orgs_model.GetOrg({ user: user._id });
        // const units = await units.GetUnit({ _id: { $in: parsed_user.units }});
        const parsed_orgs = JSON.parse(JSON.stringify(orgs))[0];

        if (user && await bcrypt.compare(password, parsed_user.password)) {
            // create token
            const token = jwt.sign(
                { user_id: parsed_user._id, email: parsed_user.email, first_name: parsed_user.first_name, last_name: parsed_user.last_name, title: parsed_user.title, units: parsed_user.units, orgs: parsed_orgs },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '1h',
                },
            );

            // save user token
            user.token = token;
            
            // set token cookie (JWT)
            // res.set({'Session-Token': token});  // header
            res.cookie('session', token, { httpOnly: false }).status(200).json({
                user_id: parsed_user._id,
                first_name: parsed_user.first_name,
                last_name: parsed_user.last_name,
                email: parsed_user.email,
                title: parsed_user.title,
                units: parsed_user.units,
                orgs: parsed_orgs,
            });
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