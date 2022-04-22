import jwt from 'koa-jwt';

import { config } from '~config';

export const AuthMiddleware = jwt({ secret: config.jwtSecret }).unless({
  path: [/^\/swagger-/],
});
