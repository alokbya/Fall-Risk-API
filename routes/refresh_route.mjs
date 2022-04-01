import express from "express";
import { verifyToken } from "../auth/auth_helpers.mjs";

const router = express.Router();

router.use(verifyToken);

router.get('/', (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: `${error}`});
    }
});

export { router };