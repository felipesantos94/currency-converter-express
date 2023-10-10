import express from 'express';
import { homePage } from '../services/homeRenderingService';
import { convertCurrency } from '../services/convertService';

const router = express.Router();

router.get('/', homePage);
router.get('/convert', convertCurrency);

export const routes = router;
