import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { HttpClient } from '../../libs/httpClient';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const http = new HttpClient();
  // https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=nCjg3rEftL9zycITUKckbKsteABXOqgSHhD025If
  const response = await http.get('https://developer.nps.gov', 'api/v1/parks', { parkCode: 'acad', api_key: 'nCjg3rEftL9zycITUKckbKsteABXOqgSHhD025If' });
  console.log(response.data.data);


  return formatJSONResponse({
    message: `Hello , welcome to the exciting Serverless world!`,
    event,
  });
}

export const main = middyfy(hello);
