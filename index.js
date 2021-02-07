var express = require ('express');
var app = express();

var mongoose = require('mongoose');

var server = app.listen(3000, listening);

function listening() {
    console.log('listening...');
}

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/rxpire', function (err) {
    if (err) throw err;
    console.log('Database connected...');

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

    app.get('/add/:name/:ndc/:lot/:day/:month/:year?', addPost);

    function addPost (request, response) {
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

        newPost.save((err, results) => {
            if (err) throw err;
            console.log('Data saved...');
        });
    }

    app.get('/getdata', (req, res) => {
        console.log('Getting data...');
        post.find({}, function (err, data){
            if (err) throw err;
            res.send(data);
        });
    });

    app.get('/remove/:postID?', removePost);

    function removePost(request, response) {
        console.log(request.params);
    }
});