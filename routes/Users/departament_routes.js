var express = require('express');
var config = require('../../config');
var verify = require('../../libs/verify');
var router = express.Router();
var Departaments = require('../../schemas/DepartmentSchema');

router.get('/departaments', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            Departaments.find({}, function(err, departaments) {
                if (err)
                    res.status(404).json({error: "not found"});
                else
                    res.status(200).json(departaments)
            })
        }
    });
});

router.get('/departaments/:id', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.departamentID) {
                Departaments.findOne({
                    _id: req.body.departamentID
                }, function(err, departament) {
                    if (err)
                        res.status(404).json({error: "not found"});
                    else
                        res.status(200).json(departaments)
                })
            } else
                res.status(400).json({error: "Bad request"});
            }

    })
});

router.post('/departaments', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.departamentName) {
                var departament = new Departaments({DepartmentName: req.body.departamentName});
                departament.save(function(err, newDepartament) {
                    if (err)
                        res.status(500).json({error: "Error add departament"});
                    else
                        res.status(200).json(newDepartament);
                    }
                )
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});

router.put('/departaments', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.departamentID) {
                Department.findByIdAndUpdate(req.body.departamentID, {
                    $set: {
                        DepartamentName: req.body.departamentName
                    }
                }, {
                    new: true
                }, function(err, departament) {
                    if (err)
                        res.status(500).json({error: "Error update departament"})
                    else
                        res.status(200).json(departament);
                    }
                )
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});

router.delete('/departaments', function(req, res) {
    verify(req.headers.authorization, function(err, id) {
        if (err)
            res.status(404).json({error: auth_error});
        else {
            if (req.body.departamentID) {
                Department.deleteOne({
                    _id: req.body.departamentID
                }, function(err, result) {
                    if (err)
                        res.status(500).json({error: "Error delete departament"});
                    else
                        res.status(200),
                        json(result);
                    }
                );
            } else
                res.status(400).json({error: "Bad request"});
            }
        })
});
module.exports = router;
