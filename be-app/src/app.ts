import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { Environment } from '../config/env';
import cors from 'cors';
import passport from 'passport';
import { passportConfiguration } from './lib/passports';
import RequestLogger from './helpers/logger';
import indexRouter from './routes/index';
import requestValidationHandler from './helpers/requestValidationHandler';
import httpErrorHandler from './helpers/httpErrorHandler';
import NotFoundError from './commons/http-errors/NotFoundError';
import messages from './commons/messages';
import { responseError } from './helpers/response';
import * as dotenv from 'dotenv';
dotenv.config();

var app = express();

app.use(cors());
// view engine setup
if (process.env.NODE_ENV === Environment.Development) {
  app.use(RequestLogger());
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passportConfiguration(passport);
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

// validation request to error handler
app.use(requestValidationHandler);

app.use('/api/v1', indexRouter);

app.get('/', function (_req, res) {
  res.send('Hello!');
});

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(new NotFoundError(messages.generalMessage.ApiNotExist));
});

app.use(httpErrorHandler);
// error handler
app.use((_error: Error, _req: express.Request, res: express.Response) => {
  responseError(res);
});

// automatically update senority user after 1 day

export default app;
