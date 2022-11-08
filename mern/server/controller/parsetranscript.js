import QA from "../models/question_answer.js"

// @Params: Transcript: JSON object for transcript with format specified in client utils folder

export default function parseTranscript(transcript){

    // Do breadth first search
    // On each layer have a counter that inrecements by 1
    // Each Layer creates QA cards that reference the child
    const lst = []


    for (var i = 0; i<transcript.questions.length; i++){
        // Creates all the necessary nards
        // dfs(transcript.questions[i], 0)
        console.log(transcript.questions[i].q1.intents[0].intent1.children)
    }

    return lst
}

// Recursive Function that creates a QA card given each layer
function dfs(root, layer){

    for(var i = 0; i < root.intents.length; i++){
        for(var j = 0; j < root.intents[i].children.length; j++){
            dfs(root.intents[i].children[j], layer++)
        }
    }
    createQA(root, layer)
}

// Function that creates card
function createQA(root, layer){

    const question = root.question
    const level = layer
    const included = root.included
    const intents = []

    //Need Base Case when root.intents[i].children[j] is empty

    for(var i = 0; i < root.intents.length; i++){
        const value = root.intents[i].value
        const included = root.intents[i].included
        const children = []

        const temp = {
            value,
            included,
            children
        }

        intents.push(temp)
    }

    QA.create({
        question,
        intents,
        level,
        included

    });

}


