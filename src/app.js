const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const router = require('./routes/index.js');

//settings
app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb+srv://Danilo:admin@cluster0.l1hvy.mongodb.net/HomeSick?retryWrites=true&w=majority',
{useNewUrlParser:true}
);

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/', router);

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});