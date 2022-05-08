import express from "express";
import * as epicAudits from '../models/epic_audit_model.mjs';
import { verifyToken } from "../auth/auth_helpers.mjs";

const router = express.Router();

router.use(verifyToken);

// Create a new Epic Audit
router.post('/', async (req, res) => {
    const payload = req.body.payload;
    const unit = req.body.unit.unit._id;
    const user = req.user.user_id;
    const dateAdded = new Date();
    const epicAudit = { unit, payload, dateAdded, user }
    epicAudits.AddEpicAudit(epicAudit)
    .then(audit => {
        res.status(201).json(audit);
    })
    .catch(error => {
        console.error(`${error}`);
        res.status(500).json({ Error: `${error}` });
    });
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