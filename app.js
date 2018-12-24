var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/walgreens', {useNewUrlParser: true})
let db = mongoose.connection;

db.once('open',function(){
    console.log('connected to mongodb')
})

db.on('error',function(err){
    console.log(err)
})

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes 
let Article = require('./models/article')



app.use('/', indexRouter);
app.use('/banner', indexRouter);
app.use('/users', usersRouter);
app.use('/countries/all', indexRouter);
app.use('/article/data',indexRouter);
app.use('/article/add',indexRouter);
app.listen(4000)
module.exports = app;
