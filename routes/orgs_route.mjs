import express from "express";
import * as orgs from '../models/orgs_model.mjs';
import { verifyToken } from "../auth/auth_helpers.mjs";

const router = express.Router();

router.use(verifyToken);

router.post('/', async (req, res) => {
    res.status(201).json({ Action: 'POST' });
});

router.get('/', async (req, res) => {
    const user = req.user.user_id;
    await orgs.GetOrg({ user: user })
        .then(org => {
            res.status(200).json(org);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `${error}`});
        });
});

router.get('/:id', async (req, res) => {
    await orgs.GetOrg({ _id: req.params.id })
        .then(org => {
            res.status(200).json(org);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `${error}`});
        });
});

router.put('/', async (req, res) => {
    res.status(200).json({ Action: 'PUT' });
});

router.delete('/', (req, res) => {
    res.status(200).json({ Action: 'Delete' });
});

export { router };