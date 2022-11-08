import QA from "../models/question_answer"
import asyncHandler from "express-async-handler"

// @Params: Transcript: JSON object for transcript with format specified in client utils folder

export default function parseTranscript(transcript){

    // Do breadth first search
    // On each layer have a counter that inrecements by 1
    // Each Layer creates QA cards that reference the child
    const lst = []

    for (var i = 0; i<transcript.questions.length(); i++){
        lst.push(dfs(transcript.questions[i], 0))
    }

    return lst
}

// Recursive Function that creates a QA card given each layer
function dfs(root, layer){

    //Base Case
    if(root.intents === undefined || root.intents.length === 0){

        //Create QA Card and Return
    }
    else{

        //Create QA card set the id to the id of the subsequent card.


        // Return the top layer card id

    }
}

// Function that creates card
export const createQA = asyncHandler( async(req, res) => {

    const question = req.body.question
    const intent = req.body.intent
    const level = req.body.intent
    const children = req.body.children

    const qa = await QA.create({
        question,
        intent,
        level,
        children
    });

    try {
        res.status(200).json({
            id: qa.id
        });
      } catch {
        res.status(400).json("Invalid QA Data");
      }

})