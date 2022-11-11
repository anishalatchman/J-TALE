import QA from "../models/question_answer.js"

export default function parse(transcript){

    const lst = []
    for (var i = 0; i<transcript.length; i++){

        lst.push(createQAs(transcript[i]))
    }

    return lst
}

function createQAs(qlist){

    const initial = qlist[0].id

    //qlist is a list of JSON objects that exists as questions/answer pairs
    for (var i = 0; i <qlist.length; i++){

        createQA(qlist[i])
    }

    // Return the first item in the list which should be the top level question
    return initial
}

function createQA(item){

    const id = item.id
    const question = item.question
    const question_included = item.question_included
    const intents = item.intents
    
    QA.create({
        id,
        question,
        question_included,
        intents
    })
}

