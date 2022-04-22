import { middlewaresAll } from '@pro-market/koa-swagger-decorator';

import { AuthMiddleware } from '~src/middlewares';

export const authRequired = (
  _target: unknown,
  _name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  const { middlewares = [] } = descriptor.value;
  descriptor.value.middlewares = middlewares;
  middlewares.push(AuthMiddleware);
  return descriptor;
};

export const authRequiredAll = middlewaresAll(AuthMiddleware);
