let mongoose = require('mongoose')

let articleSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: function(){return new mongoose.Types.ObjectId()}
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true

    },
    price: {
        type: Number,
        required: true
    },
    body:{
        type:String,
        required:true
    }
})
let Article = module.exports = mongoose.model('Article',articleSchema)