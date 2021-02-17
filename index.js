var express = require ('express');
var app = express();

var mongoose = require('mongoose');

var server = app.listen(3000, listening);

function listening() {
    console.log('listening...');
}

//Display what's in the public folder
app.use(express.static('public'));

//Connect to the local database and rxpire collection
mongoose.connect('mongodb://localhost/rxpire', function (err) {
    if (err) throw err;
    console.log('Database connected...');

    //Set schema for each post to the database
    const Schema = mongoose.Schema;
    const PostSchema = new Schema ({
        name: String,
        ndc: Number,
        lot: String,
        day: Number,
        month: Number,
        year: Number
    });

    const Model = mongoose.model;
    const post = Model('Posts', PostSchema);

    //Get form data enter on page
    app.get('/add/:name/:ndc/:lot/:day/:month/:year?', addPost);

    function addPost (request, response) {
        //Set the form data to an object in the database
        var data = request.params;
        var name = data.name;
        var ndc = data.ndc;
        var lot = data.lot;
        var day = data.day;
        var month = data.month;
        var year = data.year;

        console.log(data);

        const newPost = new post ({
            name: name,
            ndc: ndc,
            lot: lot,
            day: day,
            month: month,
            year: year
        });

        console.log(newPost);

        //Save the object to the mongodb database
        newPost.save((err, results) => {
            if (err) throw err;
            console.log('Data saved...');
        });
    }

    //Send objects from the database to the front-page
    app.get('/getdata', (req, res) => {
        console.log('Getting data...');
        post.find({}, function (err, data){
            if (err) throw err;
            res.send(data);
        });
    });

    //Get the post ID from front-end
    app.get('/remove/:postID?', removePost);

    function removePost(request, response) {
        removedID = request.params.postID;
        console.log('Removing: ' + removedID);
        //Remove the object from the database using the post ID
        post.findByIdAndRemove(removedID, function(err) {
            if (err) throw err;
        });
    }
});