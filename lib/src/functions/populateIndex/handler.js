import { HttpClient } from '@libs/httpClient';
import 'source-map-support/register';
import { SearchClient } from '@libs/searchClient';
const searchClient = new SearchClient(process.env.ES_SEARCH_NODE);
const httpClient = new HttpClient();
const PARKS_INDEX = process.env.ES_PARKS_INDEX;
const populateIndex = async () => {
    try {
        const { statusCode } = await searchClient.getIndexDetails(PARKS_INDEX);
        if (statusCode !== 404)
            await searchClient.deleteIndex(PARKS_INDEX);
        await populateParks(httpClient, 0);
    }
    catch (error) {
        console.log(error);
    }
};
async function populateParks(httpClient, current) {
    const { limit, total, data } = await getParks(httpClient, current);
    let _limit = +limit;
    let _total = +total;
    if (!_total)
        throw new Error('Process exited due to total not returned');
    await searchClient.bulkInsert(PARKS_INDEX, data, true);
    console.log('mock dump Data: ', data.map(x => x.parkCode));
    current = current + _limit;
    if (current >= _total)
        return;
    else
        return await populateParks(httpClient, current);
}
export async function getParks(httpClient, start, limit) {
    const queryObject = {
        limit: limit || 50,
        start: start || 0,
        api_key: process.env.PARKS_API_KEY
    };
    const baseUrl = process.env.PARKS_BASE_URL;
    const path = process.env.PARKS_URL_PATH;
    const response = await httpClient.get(baseUrl, path, queryObject);
    return response.data;
}
export const main = populateIndex;
//# sourceMappingURL=handler.js.map