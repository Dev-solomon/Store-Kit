const mongoose = require('mongoose');

const mongoString = "mongodb+srv://solomon:9nIVBPqRcURxMmQI@storekit.ary8d.mongodb.net/"

mongoose.connect(mongoString, {useNewUrlParser: true})

mongoose.connection.on("error", function(error) {
 console.log("There is an error in mongodb database:"+error);
})

mongoose.connection.on("open", function() {
 console.log("You are Connected to MongoDB database.");
})