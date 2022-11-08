import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flowschema = new Schema({
    name:{
        type: String,
        require: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'QA',
        require: true
    }]
})

const Flow = mongoose.model("Flow", flowschema)

export default Flow