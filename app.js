var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
const mysql = require('mysql');

var indexRouter = require('./routes/indexRouter');
var loginRouter = require('./routes/loginRouter')

const conn = mysql.createConnection({
    host: '3.34.200.80',
    user: 'root',
    password: '1234',
    port: '50731',
    database: 'ManageSys',
});

var app = express();

conn.connect(function (err) {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }

    console.log('Connected to MySQL database as id ' + conn.threadId);
});

app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false } // Set 'secure' to 'true' if using HTTPS
    })
  );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'KWAS'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('KWAS'));
app.use('/KWAS', express.static(path.join(__dirname, 'KWAS')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/main', indexRouter);
app.use('/login_form', loginRouter);
app.use('/boards', boardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.sendFile(__dirname + '/KWAS/error.html');
});

module.exports = app;
