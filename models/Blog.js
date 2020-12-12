const mongoose = require('mongoose');

let BlogSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
   },
  image : {
    type : String,
    required : true
    },
  heading : {
    type : String,
    required : true
    },
  info : {
    type : String,
    required : true
    },
  dataUrl:{
    type : String,
    required : false
    },
  created : {
    type : Date,
    // default : Date.now(),
    default : new Date(Date.now()+(60*60*1000)*5.5),
    // timezone: "Asia/Calcutta"
    }

});
let Blog = mongoose.model('Blog-MEAN', BlogSchema);
module.exports = Blog;
