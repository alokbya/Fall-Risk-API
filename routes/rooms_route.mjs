import express from "express";
import { verifyToken } from "../auth/auth_helpers.mjs";
import OrgsSchema from "../data/schemas/orgs_schema.mjs";
import * as rooms from '../models/rooms_model.mjs';

const router = express.Router();

// router.use(verifyToken);

router.post('/', async (req, res) => {
    try {
        const user = req.user !== undefined ? req.user : undefined;

        const newRoom = {
            name: req.body.name,
            unit: req.body.unit,
        };

        await rooms.AddRoom(newRoom)
            .then (room => {
                res.status(201).json(room);
            })
            .catch (error => {
                console.error(error);
                res.status(500).json({ Error: `${error}` });
            });

    } catch (error) {
        res.status(500).json({ Error: `${error}`});
    }
});

// Get rooms by unit
router.post('/unit', async (req, res) => {
    try {
        const user = req.user !== undefined ? req.user : undefined;
        await rooms.GetRoom({ unit: req.body.unit })
            .then(room => {
                res.status(200).json(room);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ Error: `${error}` });
            });
    } catch (error) {
        res.status(500).json({ Error: `${error}` });
    }
});

// Get rooms by id
router.get('/:id', async (req, res) => {
    try {
        const user = req.user !== undefined ? req.user : undefined;
        await rooms.GetRoom({})
    } catch (error) {

    }
});

router.put('/', async (req, res) => {
    res.status(200).json({ Action: 'PUT' });
});

router.delete('/', (req, res) => {
    res.status(200).json({ Action: 'Delete' });
});

export { router };