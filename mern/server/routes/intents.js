import express from "express"; 
import {getIntent, createIntent, deleteIntent, updateIntent} from "../controller/intents.js"
const router = express.Router();

router.get('/:id', getIntent);
router.post('/add', createIntent);
router.put('/update/:id', updateIntent);
router.delete('/delete/:id', deleteIntent);

export default router;