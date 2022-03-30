import express from "express";
import * as users from '../models/users_model.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    res.status(201).json({ Action: 'POST' });
});

router.get('/', async (req, res) => {
    res.status(200).json({ Action: 'GET' });
});

router.put('/', async (req, res) => {
    res.status(200).json({ Action: 'PUT' });
});

router.delete('/', (req, res) => {
    res.status(200).json({ Action: 'Delete' });
});

export { router };