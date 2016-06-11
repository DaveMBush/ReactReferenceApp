/**
 * Created by dave on 2/10/2016.
 */
var mongoose = require('mongoose');
var contactSchema = new mongoose.Schema({
    name: {type:String},
    sex: {type: String},
    dob: {type: Date}
});

module.exports = mongoose.model('Contact',contactSchema);
