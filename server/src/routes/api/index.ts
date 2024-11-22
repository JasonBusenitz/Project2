import { articleRouter } from "./article-routes.js";
import { userRouter } from "./user-routes.js";
import express from 'express';

const router = express.Router();

router.use('/users', userRouter);
router.use('/articles', articleRouter);

export default router;