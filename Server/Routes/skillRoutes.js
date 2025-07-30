import express from 'express';
import { SkillAdd, SkillDelete, SkillGet, SkillUpdate } from '../Controller/SkillController.js';
const router = express.Router();
router.post('/skillsAdd', SkillAdd);
router.get('/skillsGet', SkillGet);
router.delete("/:id", SkillDelete);
router.put("/:id", SkillUpdate);

export default router;
