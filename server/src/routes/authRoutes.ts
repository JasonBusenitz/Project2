import { Router, type Request, type Response } from 'express';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: { username },
    });

    if (!user) {
        return res.status(401).json({ error: 'Authentication Failed' });
    }

    const passworIsValid = await bcrypt.compare(password, user.password);
    if (!passworIsValid) {
        return res.status(401).json({ error: 'Authentication Failed' });
    }

    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    return res.json({ token });
};

const router = Router();

router.post('/login', login);

export default router