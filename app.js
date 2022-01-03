const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.listen (port, () => console.log('listening...'));
app.use(cors());

mongoose.connect('mongodb://localhost/rxpire', (err) => {
    if (err) throw err;

    console.log('>> Database connected');

    const Schema = mongoose.Schema;
    const DrugSchema = new Schema({
        name: String,
        ndc: Number,
        date: String,
        count: Number
    })

    const Model = mongoose.model;
    const drug = Model('posts', DrugSchema);

    app.get('/test', async (req, res) => {
        console.log('>> testing...');
        drug.find({}, (err, data) => {
            console.log(data);
            if (err) {
                res.send(err);
            }
            res.send(data);
        })
    })

    app.get('/add/:drugName/:drugNDC/:drugDate/:drugCount?', async (req, res) => {
        console.log('posting...');
        var data = req.params;
        var name = data.drugName;
        var ndc = data.drugNDC;
        var date = data.drugDate;
        var count = data.drugCount;

        console.log(data);

        const newDrug = new drug ({
            name: name,
            ndc: ndc,
            date: date,
            count: count
        });

        console.log(newDrug);
        
        newDrug.save((err, results) => {
            if (err) throw err;
            console.log('>> Data saved...');
        })
    })

    app.get('/remove/:drugID?', async (req, res) => {
       removedID = req.params.drugID;
       console.log('Removing: ' + removedID);
       drug.findByIdAndRemove(removedID, (err) => {
           if (err) throw err;
       })
    })

    app.get('/removeCount/:drugID/:currentCount/:removeNumber?', async (req, res) => {
        drugID = req.params.drugID;
        removeNumber = req.params.removeNumber;
        currentCount = req.params.currentCount;
        newCount = currentCount - removeNumber;
        console.log('Removing ' + removeNumber + ' from ' + drugID);
        drug.findByIdAndUpdate(drugID, {count: newCount}, {new: true}, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    })
})


