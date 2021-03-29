import { Client, ApiResponse, RequestParams, } from '@elastic/elasticsearch';
import { config } from 'aws-sdk';
import * as connector from 'aws-elasticsearch-connector';

export class SearchClient {

    client: Client

    constructor(node: string) {
        this.client = new Client({ ...connector(config), node });
    }

    static hitsResponse(response: ApiResponse): Array<any> {
        if (response.statusCode !== 200)
            return [];

        const h = response.body?.hits?.hits;

        return Array.isArray(h) ? h : [];
    }

    async bulkInsert<T extends { id: string }>(index: string, docs: Array<T>, setId: boolean = false) {
        const body = docs.flatMap(doc => {
            const _doc = { index: { _index: index, _type: 'doc', _id: undefined } };
            if (setId)
                _doc.index._id = doc.id;
            return [_doc, doc]
        });

        return await this.client.bulk({ refresh: true, body })
    }

    async getIndexDetails(index: string): Promise<ApiResponse> {
        try {
            const request: RequestParams.CatIndices = { index };

            const response = await this.client.cat.indices(request);

            return response;
        } catch (error) {
            if (error.statusCode === 404)
                return error;
            else
                throw error;
        }

    }

    searchIndex(index: string, val: string | number): Promise<ApiResponse> {
        let body = {}
        if(val)
            body = {query: {match:{_all:val}}};
        
        const request: RequestParams.Search = { index, body };
        return this.client.search(request);
    }

    deleteIndex(index: string) {
        const request: RequestParams.IndicesDelete = { index };
        return this.client.indices.delete(request);
    }

}
