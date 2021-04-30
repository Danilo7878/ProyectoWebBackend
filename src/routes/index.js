const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');
const Autent = require('../models/Autent');

//peticiones de usuario
router.post('/signup', (req, res) => {
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({message: 'this email is already used'});
        }else{         
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            })
            user.save().then(result => {
                res.status(201).json({
                    message: 'User has been created',
                    User: User
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            })
        }
    })
    .catch(err =>{
        error: err
    });
  });

  module.exports = router;