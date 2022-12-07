import express from "express";
import {
  getQA,
  createQA,
  deleteQA,
  updateQA,
} from "../controller/question_answer.js";
const router = express.Router();

router.get("/", getQA);
router.post("/add", createQA);
router.put("/update", updateQA);
router.delete("/delete", deleteQA);

export default router;
