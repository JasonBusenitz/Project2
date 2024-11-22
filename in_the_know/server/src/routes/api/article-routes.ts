import express from 'express';
import type { Request, Response } from 'express';
import { Article } from '../../models/index.js';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const articles = await Article.findAll();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: 'internal server error' })
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const articles = await Article.findByPk(req.params.id);
        if (articles) {
            res.status(200).json(articles);
        } else {
            res.status(400).json({ error: 'Article not Found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const savedArticle = await Article.create(req.body);
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { router as articleRouter };