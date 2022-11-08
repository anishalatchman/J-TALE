import mongoose, { Mongoose } from "mongoose"

const Schema = mongoose.Schema;

const QASchema = new Schema({
    question:{
        type: String,
        require: true
    },
    intents: [{
        name: String,
        value: mongoose.Schema.Types.ObjectId, ref: 'QA'
    }],
    level:{
        type: Number
    }
})

const QA = mongoose.model("QA", QASchema)

export default QA