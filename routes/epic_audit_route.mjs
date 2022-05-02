import express from "express";
import * as epicAudits from '../models/epic_audit_model.mjs';
import { verifyToken } from "../auth/auth_helpers.mjs";

const router = express.Router();

router.use(verifyToken);

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