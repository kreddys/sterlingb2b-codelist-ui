import {getListB2BCodelistEntries, getOneB2BCodelistEntry, createOneB2BCodelistEntry, deleteOneB2BCodelistEntry, updateOneB2BCodelistEntry} from './dataProviderUtils'


export default {
    getList: (resource, params) => {

        return getListB2BCodelistEntries(resource, params.filter, params.pagination)
    },

    getOne: (resource, params) => {

        return getOneB2BCodelistEntry(resource, params);
    },

    create: (resource, params) => {

        return createOneB2BCodelistEntry(resource, params);
    },

    delete: (resource, params) => {

        return deleteOneB2BCodelistEntry(resource, params);
    },

    update: (resource, params) => {

        return updateOneB2BCodelistEntry(resource, params);
    }

    // updateMany: (resource, params) => {
    //     const query = {
    //         filter: JSON.stringify({ id: params.ids}),
    //     };
    //     return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(params.data),
    //     }).then(({ json }) => ({ data: json }));
    // },

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