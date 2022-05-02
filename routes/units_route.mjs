import express from "express";
import * as units from '../models/units_model.mjs';
import * as users from '../models/users_model.mjs';
import { verifyToken } from "../auth/auth_helpers.mjs";


const router = express.Router();

router.use(verifyToken);

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

// join org
// router.post('/', async (req, res) => {
//     const user_units = await users.GetUser(req.body.user_id);
    
// });

router.get('/', async (req, res) => {
    let filter = {
        org: ''
    };
    if ( req.user !== undefined ) filter.org = req.user.orgs;

    await units.GetUnit(filter)
        .then(unit => {
            res.status(200).json(unit);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `${error}` });
        });
});

// get units by user id
router.get('/:id', async (req, res) => {
    const filter = {};
    let user = await users.GetUser({_id: req.params.id});
    user = JSON.parse(JSON.stringify(user))[0];
    // if (req.params.id !== undefined) filter[_id] = req.params.id;
    
    await units.GetUnit({ _id: { $in: user.units }})
        .then(unit => {
            res.status(200).json(unit);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `${error}` });
        });
});

router.put('/', async (req, res) => {
    await units.UpdateUnit({_id: req.body.id}, req.body.payload, { new: true })
    .then(unit => {
        res.status(200).json(unit);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ Error: `${error}`});
    })
});

router.delete('/', (req, res) => {
    res.status(200).json({ Action: 'Delete' });
});

export { router };