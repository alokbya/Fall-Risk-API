import express from "express";
import * as units from '../models/units_model.mjs';
import { verifyToken } from "../auth/auth_helpers.mjs";


const router = express.Router();

// router.use(verifyToken);

router.post('/', async (req, res) => {
    let newOrg = {
        name: req.body.name,
        org: req.user !== undefined ? req.user.orgs : req.body.org,
        dateCreated: new Date()
    };
    // newOrg[org] = req.user !== undefined ? req.user.orgs : req.body.org;
    // {name: req.body.name, org: org, dateCreated: new Date()}
    await units.AddUnit(newOrg)
        .then(unit => {
            res.status(201).json(unit);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `${error}` });
        });
});

router.get('/', async (req, res) => {
    const filter = {};
    if ( req.user !== undefined ) filter[org] = req.user.orgs._id;

    await units.GetUnit(filter)
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