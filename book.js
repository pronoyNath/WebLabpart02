const mongoose = require ('mongoose');
const productSchema = new mongoose.Schema({
    id:String,
    name:String,
    roll:Number,
    year:Number
});

module.exports = mongoose.model('part01',productSchema); 