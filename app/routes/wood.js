import express from 'express';
import auth from '../middlewares/auth.js';
import multer from "../middlewares/multer.js";

const router = express.Router();
import * as woodController from '../controllers/wood.js';

router.get('/', auth, woodController.readAll);
router.get('/:hardness', auth, woodController.readByHardness);
router.post("/", auth, multer, woodController.create);

export default router;