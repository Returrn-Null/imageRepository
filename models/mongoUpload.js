const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/image_repo", {//image_repo is the name of my local db
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error'));
db.once('open', function callback() {
    console.log("connected to db");
});

var uploadSchema = new mongoose.Schema({
    imageName: String
});

var uploadModel = mongoose.model('images', uploadSchema);

module.exports = uploadModel;