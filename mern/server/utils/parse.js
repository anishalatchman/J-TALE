function parse(transcript){

    const lst = []
    for (var i = 0; i<transcript.questions.length; i++){

        lst.push(createQAs(transcript.questions[i]))

    }
}

function createQAs(qlist){

    const initial = qlist[i].id

    //qlist is a list of JSON objects that exists as questions
    for (var i = 0; i <qlist.length; i++){

        createQA(qlist[i])
    }

    // Return the first item in the list which should be the top level question
    return initial

}

function createQA(item){

    

}

