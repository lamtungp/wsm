import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index';
// import camelcase from './lib/camelcase';

var app = express();

app.use(cors());
// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(camelcase);

app.use('/api/v1', indexRouter);

app.get('/', function (_req, res) {
    res.send('Hello!');
    // throw new Error('Broken');
});
// catch 404 and forward to error handler
app.use(function (req, _res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    return res.json(err);
});

export default app;
