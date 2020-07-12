import { stringify } from 'query-string';
import _ from 'lodash';
import config from '../config/config.json';

const apiUrl = config.b2b_rest_endpoint;

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

async function getB2BCodelistEntries(url, filter, pagination) 
{

    let headers = new Headers({ Accept: 'application/json' });
    const authHeader = localStorage.getItem('AuthHeader');
    headers.set('Authorization', authHeader);

    const response = await fetch(url, {headers});
    const data = await response.json();
    const reformatted = reformatB2BResponse(data);

    const filteredData =  _.filter(reformatted , (obj) => {

        let filterMatchIndex = 0;
    
        for (const [objKey, objValue] of Object.entries(obj)) {
            for (const [filterKey, filterValue] of Object.entries(filter)) {
                if(String(objKey) === String(filterKey)){
                    if(String(objValue).toLowerCase().includes(String(filterValue).toLowerCase())) {
                        filterMatchIndex = filterMatchIndex + 1
                    }
                }
              }
        }
    
        if(filterMatchIndex === Object.keys(filter).length){
            return obj
        }
    });

    const offset = (pagination.page - 1) * pagination.perPage;
    const pagedEntries = _.drop(filteredData, offset).slice(0, pagination.perPage);


    return {
        data : pagedEntries,
        total: filteredData.length
    };
};

export default {
    getList: (resource, params) => {

        const query = {
            listName: resource,
            listVersion: -1
        };

        const url = `${apiUrl}?${stringify(query)}`;

        return getB2BCodelistEntries(url, params.filter, params.pagination)

    },

    // getOne: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
    //         data: json,
    //     })),

    // getMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids }),
    //     };
    //     const url = `${apiUrl}/${resource}?${stringify(query)}`;
    //     return httpClient(url).then(({ json }) => ({ data: json }));
    // },

    // getManyReference: (resource, params) => {
    //     const { page, perPage } = params.pagination;
    //     const { field, order } = params.sort;
    //     const query = {
    //         sort: JSON.stringify([field, order]),
    //         range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    //         filter: JSON.stringify({
    //             ...params.filter,
    //             [params.target]: params.id,
    //         }),
    //     };
    //     const url = `${apiUrl}/${resource}?${stringify(query)}`;

    //     return httpClient(url).then(({ headers, json }) => ({
    //         data: json,
    //         total: getTotalCodeCount(resource,params),
    //     }));
    // },

    // update: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json })),

    // updateMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids}),
    //     };
    //     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json }));
    // },

    // create: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}`, {
    //         method: 'POST',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({
    //         data: { ...params.data, id: json.id },
    //     })),

    // delete: (resource, params) =>
    //     httpClient(`${apiUrl}/${resource}/${params.id}`, {
    //         method: 'DELETE',
    //     }).then(({ json }) => ({ data: json })),

    // deleteMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids}),
    //     };
    //     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //         method: 'DELETE',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json }));
    // },
};