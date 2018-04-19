var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var winston = require('./config/winston');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var emailRouter = require('./routes/email');
let paginate = require('express-paginate');

var app = express();

let env = process.env.NODE_ENV || 'desarrollo';
let config = require('./config/config')[env];

switch (env){
    case 'desarrollo':
        console.log(config)
        break;
    case 'produccion':
        console.log(config)
        break;
}

app.use(paginate.middleware(2, 20))

// Sessions

app.use(session({
    secret: 'secret',
    name: 'superSecret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// HBS Engine

var hbs = require('hbs');
hbs.registerPartials(`${__dirname}/views/partials`);
var hbsUtils = require('hbs-utils')(hbs);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);
require('./helpers/hbs')(hbs);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use(logger('dev'));
//app.use(logger('combined', {stream: winston.stream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/components', express.static(`${__dirname}/public/components`));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/email', emailRouter);


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
  res.render('404.hbs',{
      layout: 'template'
  });
});

module.exports = app;
