import { Router } from 'express';
import movie from './movie.router';
import company from './company.router';

const router = Router();
router.use('/movie', movie);
router.use('/company', company);

export default router;