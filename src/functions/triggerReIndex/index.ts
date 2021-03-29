import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 45,
  events: [
    {
      http: {
        method: 'post',
        path: 'reindex',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
