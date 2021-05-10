const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Verify = require('../models/Verify');
const Book = require('../models/Book');
const Movie = require('../models/Movie');
const Artist = require('../models/Artist')


router.post('/SignUp', async (req, res) => {
   await User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if(user){
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

router.post('/Login', (req,res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) return res.status(401).json({mensaje: 'Invalid Email or Password'});
        if (req.body.password != user.password) return res.status(401).json({mensaje: 'Invalid Email or Password'});       
        const token = jwt.sign({ _id: user._id}, "secretkey", {expiresIn: "2h"});
        return res.status(200).json({token: token});
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
});

//Books routes
router.post('/Create/Book', Verify, (req,res) => {       
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
        user: req.userId
    })
    book.save().then(result => {
        res.status(201).json({
            message: 'Book has been created',
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
})

router.get('/Books', Verify, (req, res) => {
    Book.find({user: req.userId})
    .then(books => {
        return res.status(200).json({books: books});
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
});

router.delete('/Delete/Book/:id', Verify, (req, res) => {
    Book.findOneAndDelete({_id: req.params.id})
    .then(doc => {
        return res.status(200).json({doc});
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
});

router.put('/Update/Book', Verify, (req, res) => {
    Book.update({_id: req.body._id},{title:req.body.title, author:req.body.author, genre: req.body.genre, year:req.body.year, user: req.userId})
    .then(doc => {
        return res.status(200).json({doc});
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
});


//Movies routes
router.post('/Create/Movie', Verify, (req,res) => {       
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        director: req.body.director,
        company: req.body.company,
        genre: req.body.genre,
        realese: req.body.realese,
        user: req.userId
    })
    movie.save().then(result => {
        res.status(201).json({
            message: 'Movie has been created',
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
})

router.get('/Movies', Verify, (req, res) => {
    Movie.find({user: req.userId})
    .then(movies => {
        return res.status(200).json({movies: movies});
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
});

router.delete('/Delete/Movie/:id', Verify, (req, res) => {
    console.log(req.params.id)
    Movie.findOneAndDelete({_id: req.params.id})
    .then(doc => {
        return res.status(200).json({doc});
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
});

router.put('/Update/Movie', Verify, (req, res) => {
    Movie.update({_id: req.body._id},{title:req.body.title, director:req.body.director, company:req.body.company, genre: req.body.genre, realese:req.body.realese, user: req.userId})
    .then(doc => {
        return res.status(200).json({doc});
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
});

//Artists routes
router.post('/Create/Artist', Verify, (req,res) => {       
    const artist = new Artist({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        genre: req.body.genre,
        state: req.body.state,
        user: req.userId
    })
    artist.save().then(result => {
        res.status(201).json({
            message: 'Artist has been created',
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
})

router.get('/Artists', Verify, (req, res) => {
    Artist.find({user: req.userId})
    .then(artists => {
        return res.status(200).json({artists: artists});
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
});

router.delete('/Delete/Artist/:id', Verify, (req, res) => {
    console.log(req.params.id)
    Artist.findOneAndDelete({_id: req.params.id})
    .then(doc => {
        return res.status(200).json({doc});
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
});

router.put('/Update/Artist', Verify, (req, res) => {
    Artist.update({_id: req.body._id},{name:req.body.name, genre: req.body.genre, state:req.body.state, user: req.userId})
    .then(doc => {
        return res.status(200).json({doc});
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
});

module.exports = router;