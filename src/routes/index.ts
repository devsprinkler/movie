import { Router } from 'express';
import movie from './movie.router';

const router = Router();
router.use('/movie', movie);

export default router;