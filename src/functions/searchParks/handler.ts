import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway';

import { SearchClient } from '@libs/searchClient';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const searchClient = new SearchClient(process.env.ES_SEARCH_NODE);

const PARKS_INDEX = process.env.ES_PARKS_INDEX;


const searchIndex: ValidatedEventAPIGatewayProxyEvent<{}>= async (event) => {

    console.log('event: ', event);
    const {q} = event.queryStringParameters;

    try {


        const response = searchClient.searchIndex(PARKS_INDEX, 'fullName', q)
        console.log(response)
        return formatJSONResponse({
            message: `Hello , welcome to the exciting Serverless world!`,
            event,
        });
    } catch (error) {
        console.log('caught error: ', error);
        return formatJSONResponse({
            message: `internal server error`,
            code: 500
        });
    }

}

export const main = middyfy(searchIndex);
