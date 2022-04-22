import path from 'path';

import dotenv from 'dotenv';
import { format, transport, transports } from 'winston';

dotenv.config({ path: '.env' });

export interface Config {
  port: number;
  dbsslconn: boolean;
  jwtSecret: string;
  databaseUrl: string;
  dbEntitiesPath: string[];

  debugLogging: boolean;
  loggerTransports: transport[];

  cronJobExpression: string;
}

const isDevMode = process.env.NODE_ENV == 'development';

export const config: Config = {
  port: +(process.env.PORT || 3000),
  dbsslconn: !isDevMode,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  databaseUrl:
    process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb',
  dbEntitiesPath: [
    ...(isDevMode ? ['src/entities/**/*.ts'] : ['dist/entities/**/*.js']),
  ],

  debugLogging: isDevMode,
  loggerTransports: [
    //
    // - Write all logs error (and below) to `error.log`.
    new transports.File({
      filename: path.resolve(process.cwd(), 'error.log'),
      level: 'error',
    }),
    //
    // - Write to all logs with specified level to console.
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],

  cronJobExpression: '0 * * * *',
};
