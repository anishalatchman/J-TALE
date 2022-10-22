import mongoose from "mongoose"

const Schema = mongoose.Schema;

const QAShema = new Schema({
    question:{
        type: String,
        require: true,
        unique: true
    },
    intent: [{
        type: String,
        require: true
    }]
})

const QA = mongoose.model("QA", QAShema)

export default QA