const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const padelFieldsSchema =  new Schema({
    location: {
        type: String,
        require:true,
        trim: true
    },
    name: {
        type: String,
        require:true,
        trim: true
    },
    owner: {
        type: String,
        trim: true,
        require: true
    },
    image:{
        type: String
    },
    availability:{
        type: Boolean,
        // default: true
    },
    type: {
        type:String,
        require:true
    },
    score: {
        type: Number
    },
    price:{
        type: Number,
        require:true
    },
    isActive: Boolean
    },
    {
        timestamps: true,
        versionKey: false
    }
)


padelFieldsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
    }
})

   

module.exports =  mongoose.model('padelFields', padelFieldsSchema)