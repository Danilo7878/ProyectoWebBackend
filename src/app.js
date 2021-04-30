const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const router = require('./routes/index.js');

//settings
app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb+srv://Danilo:admin@cluster0.l1hvy.mongodb.net/HomeSick?retryWrites=true&w=majority',
{useNewUrlParser:true}
);

//middlewares
app.use(express.json());

//routes
app.use('/', router);

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});