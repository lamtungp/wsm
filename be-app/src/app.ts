import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import { passportConfiguration } from './lib/passports';
import indexRouter from './routes/index';
import * as dotenv from 'dotenv';
dotenv.config();

var app = express();

app.use(cors());
// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passportConfiguration(passport);
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);

app.get('/', function (_req, res) {
    res.send('Hello!');
});

// automatically update senority user after 1 day

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
    res.statusCode(err.statusCode || 500);
    return res.json(err);
});

export default app;
