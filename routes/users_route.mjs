import express from "express";
import * as users from '../models/users_model.mjs';
import * as units from '../models/units_model.mjs';
import { verifyToken } from "../auth/auth_helpers.mjs";

const router = express.Router();

router.use(verifyToken);

router.post('/', async (req, res) => {
    res.status(201).json({ Action: 'POST' });
});

router.get('/', async (req, res) => {
    res.status(200).json({ Action: 'GET' });
});

router.put('/units', async (req, res) => {
    const user = req.user;
    const storedUser = await users.GetUser({_id: user.user_id});
    const parsedUser = JSON.parse(JSON.stringify(storedUser))[0];
    // find unit by id
    let unit = await units.GetUnit({_id: req.body.unit});
    unit = JSON.parse(JSON.stringify(unit))[0];
    const new_units = [...parsedUser.units, unit._id];
    users.UpdateUser({ _id: user.user_id}, { units: new_units }, {new: true})
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ Error: `${error}` });
    })
});

router.delete('/units', async (req, res) => {

});

router.delete('/', (req, res) => {
    res.status(200).json({ Action: 'Delete' });
});

export { router };