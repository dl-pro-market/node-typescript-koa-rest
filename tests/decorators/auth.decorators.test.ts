import { authRequired } from '~decorators/auth.decorators';
import { AuthMiddleware } from '~src/middlewares';

test('auth.decorators', () => {
  const obj = { value: {} };
  const descriptor = Object.getOwnPropertyDescriptor(obj, 'value');
  authRequired(obj, 'value', descriptor);
  expect(obj.value).toStrictEqual({ middlewares: [AuthMiddleware] });
});
