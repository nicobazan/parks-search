import { Client } from '@elastic/elasticsearch';
import { config } from 'aws-sdk';
import * as connector from 'aws-elasticsearch-connector';
export class SearchClient {
    constructor(node) {
        this.client = new Client({ ...connector(config), node });
    }
    async bulkInsert(index, docs, setId = false) {
        const body = docs.flatMap(doc => {
            const _doc = { index: { _index: index, _type: 'doc', _id: undefined } };
            if (setId)
                _doc.index._id = doc.id;
            return [_doc, doc];
        });
        return await this.client.bulk({ refresh: true, body });
    }
    async getIndexDetails(index) {
        try {
            const request = { index };
            const response = await this.client.cat.indices(request);
            return response;
        }
        catch (error) {
            if (error.statusCode === 404)
                return error;
            else
                throw error;
        }
    }
    async createIndex(index) {
        const request = { index };
        return this.client.indices.create(request);
    }
    searchIndex() { }
    deleteIndex(index) {
        const request = { index };
        return this.client.indices.delete(request);
    }
}
//# sourceMappingURL=searchClient.js.map