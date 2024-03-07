import express from 'express';
import renderMW from '../middleware/render-mw.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.locals.pageTitle = 'Blaze | Home';
  renderMW('index')(req, res);
});

router.get('/follows', (req, res) => {
  res.locals.pageTitle = 'Blaze | Follows';
  renderMW('follows')(req, res);
});

router.get('/dashboard', (req, res) => {
  res.locals.pageTitle = 'Blaze | Dashboard';
  renderMW('dashboard')(req, res);
});

export default router;
