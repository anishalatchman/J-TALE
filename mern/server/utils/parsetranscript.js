import QA from "../models/question_answer.js"

// @Params: Transcript: JSON object for transcript with format specified in client utils folder

//First create a lst tree of all the ids of the QA blocks
//Then based on the list tree, add the QA to the appropriate children of other QA

export default function parseTranscript(transcript){

    // Do breadth first search
    // On each layer have a counter that inrecements by 1
    // Each Layer creates QA cards that reference the child
    const lst = []


    for (var i = 0; i<transcript.questions.length; i++){
        // Creates all the necessary nards
        // lst = dfs(transcript.questions[i], 0)
        console.log(transcript.questions[i].q1.intents[0].intent1.children)
    }

    // Calls function to assign Children to QA based on lst
    createChildren(lst)

    //return top level of lst which contains the starting 5 QA pairs

}

function dfs(root){
    
    if(root.intents == undefined || root.intents.length < 1){
        //Instead of console log, create a QA thing
        console.log(root.val)
        return [createQA(root)]
    }

    for(var i = 0; i < root.intents.length; i++){
        
        if(root.intents[i].children == undefined || root.intents[i].children.length < 1){
            break
        }
        
        for(var j = 0; j < root.intents[i].children.length; j++){
            dfs(root.intents[i].children[j])
        }
    }
    //Instead of console log, create a QA thing
    console.log(root.val)
    return [createQA(root)]
}

function createQA(root){


}

function addChildren(lst){


}

// Recursive Function that creates a QA card given each layer
// function dfs(root, layer){

//     for(var i = 0; i < root.intents.length; i++){
//         for(var j = 0; j < root.intents[i].children.length; j++){
//             dfs(root.intents[i].children[j], layer++)
//         }
//     }
//     createQA(root, layer)
// }



// Function that creates card
// function createQA(root, layer){

//     const question = root.question
//     const level = layer
//     const included = root.included
//     const intents = []

//     //Need Base Case when root.intents[i].children[j] is empty

//     for(var i = 0; i < root.intents.length; i++){
//         const value = root.intents[i].value
//         const included = root.intents[i].included
//         const children = []

//         const temp = {
//             value,
//             included,
//             children
//         }

//         intents.push(temp)
//     }

//     QA.create({
//         question,
//         intents,
//         level,
//         included

//     });

// }


