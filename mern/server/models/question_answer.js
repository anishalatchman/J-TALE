import mongoose from "mongoose"

const Schema = mongoose.Schema;

const QASchema = new Schema({
    id: { 
        type: String,
        require: true
    },
    question:{
        type: String,
        require: true
    },
    question_included:{
        type: Boolean
    },
    intents: [{
        type: String,
        included: Boolean,
        children: String
    }]
})

const QA = mongoose.model("QA", QASchema)

export default QA