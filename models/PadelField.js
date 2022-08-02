const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const padelFieldsSchema =  new Schema({
    location: {
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
        default: true
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
    }
    })

   

module.exports =  mongoose.model('padelFields', padelFieldsSchema)