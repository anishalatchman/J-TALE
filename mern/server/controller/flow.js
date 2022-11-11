import Flow from "../models/flow.model.js"
import parse from "../utils/parse.js";
import asyncHandler from "express-async-handler";

export const getFlow = asyncHandler(async(req, res) => {

    try {
        const flow = await Flow.findById(req.params.id)
        res.status(200).json({flow})
    } catch (error) {
        res.status(400).json("No Flow Exist")
    }
})

export const createFlow = asyncHandler(async(req, res) => {

    const name = req.body.name
    // const name = res.body.name
    const transcript = req.body.questions
    // Calls Function to Craete the QA Pair and returns the top level pairs
    const questions = parse(transcript)

    let flowExists = await Flow.findOne({ name });

    if(flowExists){
        res.status(404).json("Session already exists")
    }

    const flow = await Flow.create({
        name,
        questions
    });
    if (flow) {
        res.status(200).json({
            id: transcript.id,
            name: transcript.name
        });
    } else {
        res.status(400).json("Invalid transcript Data");
    }

})

export const updateFlow = asyncHandler(async(req, res) => {

    const flow = await Flow.findById(req.params.id)

    if(!flow){
        res.status(401).json("No Flow Exists with Given ID")
    }

    const name = req.body.name
    const questions = req.body.questions

    try {
        if (name){
            flow.name = name
        }
        if (questions){
            flow.questions = questions
        }
        flow.save()
        res.status(200).json(
            "Flow Updated",
            flow.id
        )
    } catch (error) {
        res.status(404).json("Invalid Input Fields")
    }
})


export const deleteFlow = asyncHandler(async(req, res) => {

    try{
        const flow = Flow.findByIdAndDelete(req.params.id)
        res.status(200).json(flow)
    } catch{
        res.status(400).json("Unable to Delete Flow")
    }
})


