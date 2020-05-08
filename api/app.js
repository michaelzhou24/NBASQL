var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mysql = require('mysql');
var fs = require('fs');
var indexRouter = require('./routes/index');

var app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'nbaDB'
  });

db.connect((err) => {
    if (err)
        throw err;
    console.log('Connected to database!');
});
global.db = db;

const tablesSql = fs.readFileSync('sql/tableCreation.sql').toString();
const insertionsSql = fs.readFileSync('sql/insertions.sql').toString();
const tableArr = tablesSql.split(';');
const insArr = insertionsSql.split(';');
tableArr.forEach((query) => {
    db.query(query, (err, res) => {
        if (err){
            return;
        }
    });
});
insArr.forEach((query) => {
    db.query(query, (err, res) => {
        if (err){
            return;
        }
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get("/players", (req, res) => {
  let query = 'select * from teamplayers';
  db.query(query, (err, result) => {
    if (err){
      res.send(err);
    } else {
      res.json({
        data: result
      });
    }
  });
});
app.get('/players/add', (req, res) => {
  const {name, team, num, position, z} = req.query;
  const player_ins_query = '';
});
app.get("/teams", (req, res) => {
  let query = '';
  db.query(query, (err, result) => {
    if (err){
      res.send(err);
    } else {
      res.json({
        data: result
      });
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
