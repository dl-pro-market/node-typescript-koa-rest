import { Middleware } from '@koa/router';
import winston from 'winston';

import { config } from '~config';

const logger = (winstonInstance: typeof winston): Middleware => {
  winstonInstance.configure({
    level: config.debugLogging ? 'debug' : 'info',
    transports: config.loggerTransports,
  });

  return async (ctx, next) => {
    const start = new Date().getTime();
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;

      if (ctx.status === 500) console.log('error', err);
    }
    const ms = new Date().getTime() - start;

    let logLevel: string;
    if (ctx.status >= 500) {
      logLevel = 'error';
    } else if (ctx.status >= 400) {
      logLevel = 'warn';
    } else {
      logLevel = 'info';
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

    winstonInstance.log(logLevel, msg);
  };
};

export { logger };
