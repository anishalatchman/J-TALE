import express from "express" 
import {getTranscript, createTranscript, createTranscriptAPI, deleteTranscript, updateTranscript} from "../controller/transcript.js"
const router = express.Router();

router.get('/', getTranscript);
router.post('/add', createTranscript);
router.post('/add/API', createTranscriptAPI)
router.put('/update/:id', updateTranscript);
router.delete('/delete/:id', deleteTranscript);

export default router;

