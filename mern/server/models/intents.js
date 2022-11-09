import mongoose, { Mongoose } from "mongoose"

const Schema = mongoose.Schema;

const intentSchema = new Schema({
    value:{
        type: String,
        require: true
    },
    included: {
        type: Boolean,
        require: true
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'QA'
    }]
})

const Intent = mongoose.model("Intent", intentSchema)

export default Intent