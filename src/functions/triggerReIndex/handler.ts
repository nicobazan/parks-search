import 'source-map-support/register';
import { Lambda } from 'aws-sdk';
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway';
import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { SearchIndicies } from '../../enums';
import schema from './schema';


const lambda = new Lambda();

const triggerLambda: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    console.log('EVENT: ', event);
    
    try {

        const index = event.body.index;
        const { REGION, AWS_ACCOUNT, LAMBDA_REINDEX_FUNCTION } = process.env;

        if (!Object.values(SearchIndicies).includes(index))
            return formatJSONResponse({ message: `${index} cant be reIndexed` }, 400);

        const arn = `arn:aws:lambda:${REGION}:${AWS_ACCOUNT}:${LAMBDA_REINDEX_FUNCTION}`;

        const invokeArgs = JSON.stringify({index});
        await lambda.invokeAsync({ FunctionName: arn, InvokeArgs:invokeArgs } as Lambda.InvokeAsyncRequest).promise()


        return formatJSONResponse({ message: `reIndex started` });
    } catch (e) {
        console.log(e);
        return formatJSONResponse({ message: `internal server error` }, 500);
    }


}

export const main = middyfy(triggerLambda);
