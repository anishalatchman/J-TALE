import express from "express"; 
import {getQA, createQA, deleteQA, updateQA} from "../controller/question_answer.js"
const router = express.Router();

router.get('/:id', getQA);
router.post('/add', createQA);
router.put('/update/:id', updateQA);
router.delete('/delete/:id', deleteQA);

export default router;