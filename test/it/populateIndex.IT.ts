/**
 * 
 * This test suite is an integration test for the populate index function
 * This test should call the main handler function and reindex the parks index
 * this test will start with no index created. After the main function is ran it
 * will assert that the parks index was created and populated with all the aavailable
 * parks from the national forest api.
 */

// LOAD THE LOCAL ENVIRONMENT
import * as dotenv from "dotenv";
dotenv.config();

// ASSERT WITH CHAI
import { expect} from 'chai';

// MAIN FUNCTION BEING TESTED
import {main} from '../../src/functions/populateIndex/handler';

// LIBS USED TO AQUIRE ASSERTION DATA
import { HttpClient } from '../../src/libs/httpClient';
import { SearchClient } from '../../src/libs/searchClient';
import {getParks} from '../../src/functions/populateIndex/handler';


const PARKS_INDEX = process.env.ES_PARKS_INDEX;

// INSTANTIATE HELEPR CLASSES
const searchClient = new SearchClient(process.env.ES_SEARCH_NODE);
const httpClient = new HttpClient();

describe('This should populate the ES index for parks', () => {

    before(async () => {
        // CHECK IF A PARKS INDEX ALREADY EXISTS
        const { statusCode } = await searchClient.getIndexDetails(PARKS_INDEX);
        // IF DOESNT RETURN A 404 WE CAN INFER ONE EXISTS
        // DELETE IT NOW
        if (statusCode !== 404)
            await searchClient.deleteIndex(PARKS_INDEX);
    });


    it(' Should run the MAIN function and pull data from api then insert into ES', async() => {
        await main();

        // TOTAL AMOUNT OF PARKS FROM NATIONAL PARKS API
        const {total:parkTotal} = await getParks(httpClient,0);
        
        // DETAILS OF NEWLY REINDEXED PARKS INDEX
        const {body} = await searchClient.getIndexDetails(PARKS_INDEX)

        // RESPONSE IS A SPACE SEPARATED STRING EX: "DATA1 DATA2 DATA4"
        const esResponse = body.split(' ');

        //assert index was created
        expect(esResponse[2]).to.equal(PARKS_INDEX);
        //assert all parks gotr inserted
        expect(esResponse[5]).to.equal(parkTotal);

    })
})