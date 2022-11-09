import mongoose from "mongoose"

const Schema = mongoose.Schema;

const QASchema = new Schema({
    question:{
        type: String,
        require: true
    },
    intents: [{
        type: String,
        included: Boolean,
        children: mongoose.Schema.Types.Mixed
    }],
    // level:{
    //     type: Number
    // },
    included: Boolean
})

const QA = mongoose.model("QA", QASchema)

export default QA