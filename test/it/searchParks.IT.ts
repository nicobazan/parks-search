/**
 * 

 */

// LOAD THE LOCAL ENVIRONMENT
import * as dotenv from "dotenv";
dotenv.config();

// ASSERT WITH CHAI
import { expect } from 'chai';

// MAIN FUNCTION BEING TESTED
import { main } from '../../src/functions/searchParks/handler';

import mock from '../mocks/searchParks.mock'
import type { APIGatewayEvent } from "aws-lambda"


describe('This should search the parks index based on Name', () => {

    const event = mock as unknown;

    it(' shouls make a request to ES parks index', async () => {
        const response = await main(event as APIGatewayEvent);

        //assert an array of pars was returned
        const body= JSON.parse(response.body);
        expect(!!body.parks.length).to.equal(true);

    })
})