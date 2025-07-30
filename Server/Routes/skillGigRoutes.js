import express from 'express';
import { createSkillGig } from '../Controller/skillGigController.js';
const router = express.Router();
router.post('/create', createSkillGig);


export default router;
