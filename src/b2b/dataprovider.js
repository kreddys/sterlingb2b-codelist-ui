import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import _ from 'lodash';

const apiUrl = 'http://ehatldv1sfg01.innovate.lan:20074/B2BAPIs/svc/codelistcodes/';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    options.headers.set('Authorization', `Basic a3JlZGR5OiR1cGVyTWFyaW80NA==`);

    return fetchUtils.fetchJson(url, options);
};

const reformatB2BResponse = (codelistcodes) => {

    const reformatted = [];

    codelistcodes.map( item => {
        reformatted.push(
            _.mapKeys( item, ( value, key ) => {
                let newKey = key;
                if( key === '_id' ) {
                    newKey = 'id';
                }

                return newKey;
            })
        )
    });

    return reformatted;
};

const getTotalCodeCount = (resource,params ) => {

    const query = {
        ...params.filter,
        listName: resource,
        listVersion: -1,
    };

    const url = `${apiUrl}?${stringify(query)}`;

    const request = new Request(url, {
        method: 'GET',
        headers: new Headers({ Accept: 'application/json', 
                Authorization: 'Basic a3JlZGR5OiR1cGVyTWFyaW80NA=='}),
    });
    return fetch(request)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(json => {
            const totalCodeCount =  json.length
            return totalCodeCount
        });
};


export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        console.log('page', page)
        console.log('perPage', perPage)
        console.log('field', field)
        console.log('order', order)

        const query = {
            listName: resource,
            listVersion: -1
        };
        const url = `${apiUrl}?${stringify(query)}`;
        
        /**Get TotalCodeCount manually.
         * Content-Range Header is not working for B2BRestAPI's */
        let totalCodeCount;
        getTotalCodeCount(resource,params).then(total => {totalCodeCount = total})

        return httpClient(url).then(({ headers, json }) => ({
            data: reformatB2BResponse(json),
            total: totalCodeCount
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: getTotalCodeCount(resource,params),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};