import QA from "../models/question_answer.js"
import asyncHandler from "express-async-handler";

export const getQA = asyncHandler(async(req, res) => {

    const id = req.body.id
    const qa = await QA.findOne({id})

    if(!qa){
        res.status(400).json("No Qa Exists with Given Session ID")
    }
    else{
        res.status(200).json(qa)
    }
})

export const createQA = asyncHandler( async(req, res) => {

    const id = req.body.id
    const question = req.body.question
    const intent = req.body.intent
    const question_included = req.body.question_included

    const qa = await QA.create({

        id,
        question,
        intent,
        question_included
    });

    try {
        res.status(200).json({
            id: qa.id
        });
      } catch {
        res.status(400).json("Invalid QA Data");
      }

})

export const deleteQA = asyncHandler( async(req, res) => {

    const id = req.body.id
    try{
        const qa = await QA.findOneAndDelete({id})
        res.status(200).json(qa)
    } catch(error){
        res.status(404).json("Unable to Delete QA")
    }
})

export const updateQA = asyncHandler(async(req, res) => {

    const id = req.body.id
    const qa = await QA.findOne({id})

    const question = req.body.question
    const intents = req.body.intents
    const question_included = req.body.question_included

    if(!qa){
        res.status(401).json("QA not Found")
    }

    try{
        if(question){
            qa.question = question
        }
        if(intents){
            qa.intents = intents
        }
        if(question_included){
            qa.question_included = question_included
        }
        qa.save()
        res.status(200).json(qa.id)
    } catch(error){
        res.status(400).json("Invalid Input Fields")
    }
})