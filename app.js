var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs_sections = require('express-handlebars-sections');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./middlewares/session.mdw')(app);

app.use('/', require('./routes/account.route'));
require('./middlewares/local.mdw')(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use('/', require('./routes/merchant/upload.route'));
app.use('/', require('./routes/admin/manage.route'));
app.use('/', require('./routes/all.route'));
app.use('/', require('./routes/item.route'));

app.use('/user', require('./routes/profile.route'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
module.exports = app;