const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
const Schema = mongoose.Schema;

const userSchema =  new Schema({
    name: {
        type: String,
        require:true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        require: true,
        lowercase:true
    },
    password:{
        type: String,
        require:true,
        trim:true
    },
    contact: {
        type: Number,
        unique: true,
        require: true
    },
    username: {
        type: String,
        require:true,
        trim: true
    },
    lastName:{
        type:String,
        require:true,
        trim: true
    },
    score:{
        type: Number
    },
    history:{
        type: Array
    },
    padelFields:[{
        type: ObjectId,
        ref: "padelFields",
        require: true
    }],
    isActive: Boolean

},
{
    timestamps: true,
    versionKey: false
}
)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
    }
})

module.exports =  mongoose.model('user', userSchema)