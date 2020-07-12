import { stringify } from 'query-string';
import _ from 'lodash';

const apiUrl = 'http://ehatldv1sfg01.innovate.lan:20074/B2BAPIs/svc/codelistcodes/';

function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
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

async function b2bGetCodelistEntries(url) 
{

    let headers = new Headers({ Accept: 'application/json' });
    headers.set('Authorization', `Basic a3JlZGR5OiR1cGVyTWFyaW80NA==`);

    let response = await fetch(url, {headers});
    let data = await response.json();
    
    let reformatted = reformatB2BResponse(data);

    let listName = reformatted[0].listName;
    let _rangeRemovedURL = removeParam("_range", url);

    let rangeRemovedResponse = await fetch(_rangeRemovedURL, {headers});
    let rangeRemovedData = await rangeRemovedResponse.json();  

    return {
        data : reformatted,
        total: rangeRemovedData.length
    };
}

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            listName: resource,
            listVersion: -1,
            _range: JSON.stringify((page - 1) * perPage) + '-' + JSON.stringify(page * perPage - 1)
        };
        const url = `${apiUrl}?${stringify(query)}`;

        return b2bGetCodelistEntries(url)

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