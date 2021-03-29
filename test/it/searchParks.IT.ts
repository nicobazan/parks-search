/**
 * 

 */

// LOAD THE LOCAL ENVIRONMENT
import * as dotenv from "dotenv";
dotenv.config();

// ASSERT WITH CHAI
import { expect} from 'chai';

// MAIN FUNCTION BEING TESTED
import {main} from '../../src/functions/searchParks/handler';

import mock from '../mocks/searchParks.mock'
import { Context } from "aws-lambda";


// const PARKS_INDEX = process.env.ES_PARKS_INDEX;

// // INSTANTIATE HELEPR CLASSES
// const searchClient = new SearchClient(process.env.ES_SEARCH_NODE);
// const httpClient = new HttpClient();

describe('This should search the parks index based on Name', () => {



    it(' shouls make a request to ES parks index', async() => {
        const response = await main(mock,{} as Context, function(){});
        console.log(response);
              //assert all parks gotr inserted
        expect('esResponse[5]').to.equal('parkTotal');

    })
})