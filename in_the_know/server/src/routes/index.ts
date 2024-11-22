import apiRoutes from './api/index.js';
import express from 'express';
import authRoutes from './authRoutes.js'

const router = express.Router();

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

export default router;