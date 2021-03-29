import axios from 'axios';
import { stringify } from 'query-string';
export class HttpClient {
    get(base, path, qsObj) {
        const url = `${base}/${path}?${stringify(qsObj)}`;
        return axios.get(url);
    }
}
//# sourceMappingURL=httpClient.js.map