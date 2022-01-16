import { Router } from 'express';
import movie from './movie.router';
import company from './company.router';
// import people from './people.router';
import boxOffice from './boxoffice.router';

const router = Router();
router.use('/movie', movie);
router.use('/company', company);
// router.use('/people', people);
router.use('/boxoffice', boxOffice);

export default router;