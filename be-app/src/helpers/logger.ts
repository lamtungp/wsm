import * as winston from 'winston';
import 'winston-daily-rotate-file';
import dayjs from 'dayjs';
import expressWinston from 'express-winston';
import config, { Environment } from '../../config/env';

const { combine, timestamp, printf, colorize, align, simple, prettyPrint } = winston.format;

const logFormat = printf((info: winston.Logform.TransformableInfo): string => {
  if (!!info.details) {
    return `${info.level} [${dayjs(info.timestamp).format('MM-DD-YYYY HH:mm:ss')}] : ${info.message} : ${
      info.details.body[0].message
    }`;
  }
  return `${info.level} [${dayjs(info.timestamp).format('MM-DD-YYYY HH:mm:ss')}] : ${info.message}`;
});

const transportDaily = new winston.transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '1d',
  dirname: './log_file',
});

transportDaily.on('rotate', function (oldFilename, newFilename) {
  // do something fun
  logger.info({ message: 'New file created!' });
});

const createLoggerForEnv = (environment: string) => {
  let logger: winston.Logger;
  switch (environment) {
    case Environment.Development:
      logger = winston.createLogger({
        format: combine(colorize(), timestamp(), prettyPrint(), logFormat, align()),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: 'combined.log' }),
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
        ],
      });
      logger.level = 'debug';
      break;

    case Environment.TEST:
      logger = winston.createLogger({});
      logger.level = 'debug';
      logger.add(
        new winston.transports.Console({
          format: simple(),
          silent: process.env.ENABLE_TEST_LOGGING !== 'true',
        }),
      );
      break;

    case Environment.Production:
      logger = winston.createLogger({
        transports: transportDaily,
      });
      logger.level = 'info';
      logger.add(
        new winston.transports.Console({
          format: combine(timestamp(), simple(), align()),
        }),
      );
      break;
  }
  return logger;
};

export const logger = createLoggerForEnv(config.environment);

export default function RequestLogger() {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  return expressWinston.logger({
    winstonInstance: logger,
    colorize: true,
  });
}
