import mongoose from "mongoose"

const Schema = mongoose.Schema;

const QAShema = new Schema({
    question:{
        type: String,
        require: true
    },
    intents: [{
        type: String
    }],
    level:{
        type: Number
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'QA',
    }]
})

const QA = mongoose.model("QA", QAShema)

export default QA