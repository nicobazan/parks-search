import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { HttpClient } from '../../libs/httpClient';
const hello = async (event) => {
    const http = new HttpClient();
    const response = await http.get('https://developer.nps.gov', 'api/v1/parks', { parkCode: 'acad', api_key: 'nCjg3rEftL9zycITUKckbKsteABXOqgSHhD025If' });
    console.log(response.data.data);
    return formatJSONResponse({
        message: `Hello , welcome to the exciting Serverless world!`,
        event,
    });
};
export const main = middyfy(hello);
//# sourceMappingURL=handler.js.map