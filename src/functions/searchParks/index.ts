import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  timeout: 6,
  events: [
    {
      http: {
        method: 'get',
        path: 'search/parks',
        request: {
            parameters: {
              querystrings: {
                q: true
              }
            }
          }
      }
    }
  ]
}
