import express from "express";
import {
  LanguageAdd,
  LanguageGet,
  LanguageDelete,
  LanguageUpdate,
} from "../Controller/LanguageController.js";

const router = express.Router();

router.post("/languageAdd", LanguageAdd);
router.get("/languagesGet", LanguageGet);
router.delete("/:id", LanguageDelete);
router.put("/:id", LanguageUpdate);

export default router;
