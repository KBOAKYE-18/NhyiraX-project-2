const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename:{
        type:String,
        required:true
    },
    data:{
        type:Buffer,
        required:true
    },
    mimetype:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    uploadedAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const File = mongoose.model('File',fileSchema);
module.exports = File;