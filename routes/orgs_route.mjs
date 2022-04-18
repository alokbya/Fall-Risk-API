import express from "express";
import * as orgs from '../models/orgs_model.mjs';
import { verifyToken } from "../auth/auth_helpers.mjs";

const router = express.Router();

// router.use(verifyToken);

router.post('/', async (req, res) => {
    try {
        const user = req.user !== undefined ? req.user : undefined;
        
        const newOrg = {
            name: req.body.name,
            dateCreated: new Date(),
        };

        if ( user !== undefined ) newOrg[admins] = [user.user_id];
        if ( user !== undefined ) newOrg[owner] = user.user_id;
        if ( user !== undefined ) newOrg[users] = [user.user_id];

        await orgs.AddOrg(newOrg)
        .then(org => {
            res.status(201).json(org);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `${error}` });    
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: `${error}` });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try{
        const user = req.user.user_id;
        await orgs.GetOrg({ users: [user] })
        .then(org => {
            res.status(200).json(org);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: `${error}`});
        });
    }
    catch(error){
        res.status(500).json({ Error: `${error}`});
    }
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

router.delete('/', async (req, res) => {
    await orgs.DeleteOrg({_id: req.body.id})
        .then(org => {
            if (org.deletedCount > 0) {
                res.status(204).json(org);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            res.status(500).json({ Error: `${error}` });
        });
});

export { router };