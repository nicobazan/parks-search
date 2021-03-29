import 'source-map-support/register';
import { Lambda } from 'aws-sdk';
import { formatJSONResponse } from '../../libs/apiGateway';
import { middyfy } from '../../libs/lambda';
import { SearchIndicies } from '../../enums';
const lambda = new Lambda();
const hello = async (event) => {
    console.log('EVENT: ', event);
    try {
        const index = event.body.index;
        const { REGION, AWS_ACCOUNT, LAMBDA_REINDEX_FUNCTION } = process.env;
        if (!Object.values(SearchIndicies).includes(index))
            return formatJSONResponse({ message: `${index} cant be reIndexed` }, 400);
        const arn = `arn:aws:lambda:${REGION}:${AWS_ACCOUNT}:${LAMBDA_REINDEX_FUNCTION}`;
        await lambda.invokeAsync({ FunctionName: arn }).promise();
        return formatJSONResponse({ message: `Hello , welcome to the exciting Serverless world!` });
    }
    catch (e) {
        console.log(e);
        return formatJSONResponse({ message: `internal server error` }, 500);
    }
};
export const main = middyfy(hello);
//# sourceMappingURL=handler.js.map