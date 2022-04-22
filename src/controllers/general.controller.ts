import {
  description,
  request,
  summary,
  tagsAll,
} from '@pro-market/koa-swagger-decorator';
import { BaseContext } from 'koa';

@tagsAll(['General'])
export default class GeneralController {
  @request('get', '/')
  @summary('Welcome page')
  @description(
    'A simple welcome message to verify the service is up and running.'
  )
  public static async helloWorld(ctx: BaseContext): Promise<void> {
    ctx.body = 'Hello World!';
  }
}
