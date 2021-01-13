const express = require("express");
var exphbs = require("express-handlebars");
const multer = require("multer");
const imageModel = require("./models/mongoUpload");
const imageData = imageModel.find({})
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public/images"));

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

var upload = multer({
    storage: Storage,
}).single("image", ); //Field name and max count

app.get("/", (req, res) => {

    const searchData = imageModel.find({imageName: req.query.imageName});
    searchData.exec(function(err,data){
        if(err) throw err;

        console.log(data)

        res.render('home',{records:data, success: false})
    })
});

app.post("/", (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Something went wrong");
        } else {
            console.log(req.file.path);
            var imageName = req.file.filename;

            var imageDetails = new imageModel({
                imageName: imageName,
            });

            imageDetails.save(function (err, doc) {
                if (err) throw err;

                console.log("Image Saved");

                imageData.exec(function(err,data){
                    if(err) throw err;


                    res.render('home',{records:data,success:true});
                })
            });
        }
    });
});

function reset() {
    document.getElementById("form").reset();
}

app.listen(5000, () => {
    console.log("App is listening on Port 5000");
});