import 'source-map-support/register';
import type { APIGatewayEvent} from "aws-lambda"

import { SearchClient} from '@libs/searchClient';

import { formatJSONResponse } from '@libs/apiGateway';

const searchClient = new SearchClient(process.env.ES_SEARCH_NODE);

const PARKS_INDEX = process.env.ES_PARKS_INDEX;


const searchIndex = async (event: APIGatewayEvent) => {
event.queryStringParameters
    console.log('event: ', event);
    const q = event.queryStringParameters?.q;

    try {


        const response =await  searchClient.searchIndex(PARKS_INDEX, q)
        
        const hits = SearchClient.hitsResponse(response);
                
        const parks = hits.map(h=>h._source); 
        
        return formatJSONResponse({parks});
    } catch (error) {
        console.log('caught error: ', error);
        return formatJSONResponse({
            message: `internal server error`,
            code: 500
        });
    }

}

export const main = searchIndex;
