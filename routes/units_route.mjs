import express from "express";
import * as units from '../models/units_model.mjs';
import { verifyToken } from "../auth/auth_helpers.mjs";


const router = express.Router();

router.use(verifyToken);

router.post('/', async (req, res) => {
    const org = req.user.orgs;
    await units.AddUnit({name: req.body.name, org: org, dateCreated: new Date()})
        .then(unit => {
            res.status(201).json(unit);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `${error}` });
        });
});

router.get('/', async (req, res) => {
    const org = req.user.orgs;
    await units.GetUnit({org: org._id})
        .then(unit => {
            res.status(200).json(unit);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `${error}` });
        });
});

router.put('/', async (req, res) => {
    res.status(200).json({ Action: 'PUT' });
});

router.delete('/', (req, res) => {
    res.status(200).json({ Action: 'Delete' });
});

export { router };