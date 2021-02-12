import express from 'express';
import createRegister from '../controllers/RegisterControllers.js';
import upload from '../middlewares/upload.js';
import validation from '../middlewares/validation.js';
const router = express.Router();

//Registeration Routers
router.get('/', (req, res) => {
  res.send('zoma');
});
router.get('/status', (req, res) => {
  res.send('yes');
});
router.post('/register', upload.single('thumbnail'), validation, createRegister);

export default router;
