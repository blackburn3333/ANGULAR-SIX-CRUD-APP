const express = require('express');
const router = express.Router();


//example model
const Notemodel = require('../models/note_model');

router.get('/', (req, res, next) => {
    Notemodel.find().exec()
        .then(doc => {
            if (doc.length >= 1) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: "Empty result" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.post('/', (req, res, next) => {
    console.log(res.body);
    const note_model = new Notemodel({
        note_title: req.body.note_title,
        note_description: req.body.note_description,
    });
    note_model.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Note Insert Successful',
                status: true
            });
        }).catch(err => { console.log(err); res.status(500).json({
            message: err,
            status: false
        }) })
});

router.get('/:ID', (req, res, next) => {
    const ID = req.params.ID;
    Notemodel.findById(ID)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: "Not Available" })
            }
        })
        .catch(err => { console.log(err); res.status(500).json({ error: err }) })
});

//send values inside of array []
//[
	//{"propName": "example_column_one",		"value": "ExampleData"},
	//{"propName": "example_column_two",		"value": "ExampleData"},
	//{"propName": "example_column_three",      "value": ExampleData"},
//]
router.patch('/:note_id', (req, res, next) => {
    console.log(req.body);
    const ID = req.params.note_id;
    const updateValues = {};
    for (const ops of req.body) {
        updateValues[ops.propName] = ops.value
    }
    Notemodel.update({ _id: ID }, { $set: updateValues })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({ 
            message: 'Note Update Successful',
            status: true });
        })
        .catch(err => { console.log(err); res.status(500).json({ error: err }) })
});

router.delete('/:note_id', (req, res, next) => {
    Notemodel.remove({
        _id: req.params.note_id
    }).exec()
        .then(result => {
            res.status(200).json({
                message:"Delete successful",
                status: true
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err,
                status: false
            })
        })
});

module.exports = router;
