import express from "express"; 
import {getFlow, createFlow, deleteFlow, updateFlow} from "../controller/flow.js"
const router = express.Router();

router.get('/:id', getFlow);
router.post('/add', createFlow);
router.put('/update/:id', updateFlow);
router.delete('/delete/:id', deleteFlow);

export default router;