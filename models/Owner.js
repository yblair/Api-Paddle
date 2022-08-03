const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
const Schema = mongoose.Schema;
const ownerSchema =  new Schema({
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
    contact: {
        type: Number,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require:true,
        trim:true
    },
    username: {
        type: String,
        require:true,
        trim: true
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

ownerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
    }
  })

module.exports =  mongoose.model('owner', ownerSchema)