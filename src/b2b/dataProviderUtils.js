import _ from 'lodash';
import { stringify } from 'query-string';
import config from '../config/config.json';

const apiUrl = config.b2b_rest_endpoint;

const reformatB2BResponse = (codelistcodes) => {

    const reformatted = [];

    // eslint-disable-next-line
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

export const getListB2BCodelistEntries = async function getListB2BCodelistEntries(url, filter, pagination) 
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

export const getOneB2BCodelistEntry = async function getOneB2BCodelistEntry(resource, params) {

    let headers = new Headers({ Accept: 'application/json' });
    const authHeader = localStorage.getItem('AuthHeader');
    headers.set('Authorization', authHeader);  

    const configuration = _.find(config.codelists, ['name', resource]);
    const senderCodeConfig = _.find(configuration.create_and_edit, ['source', 'senderCode']);
    const receiverCodeConfig = _.find(configuration.create_and_edit, ['source', 'receiverCode']);

    let pipeCount = 0;
    const listName = resource;
    pipeCount = pipeCount + 1;
    pipeCount = pipeCount + 1; //senderId
    pipeCount = pipeCount + 1; //receiverId
    
    const listVersion = _.find(config.codelists, function(o) { return o.name === resource; }).listVersion || -1;
    pipeCount = pipeCount + 1;

    let senderCode= '';
    let receiverCode = '';

    if(senderCodeConfig.isPipeDelimited){
        for (var i = pipeCount; i < pipeCount + senderCodeConfig.pipeDelimitedFields; i++) {
            senderCode = senderCode + '|' +  params.id.split("|")[i];
          }
          
          senderCode = senderCode.substr(1);
          pipeCount = pipeCount + senderCodeConfig.pipeDelimitedFields
    }else{
        senderCode = params.id.split("|")[4];
        pipeCount = pipeCount + senderCodeConfig.pipeDelimitedFields        
    }

    if(receiverCodeConfig.isPipeDelimited){
        for (var j = pipeCount; j < pipeCount + receiverCodeConfig.pipeDelimitedFields; j++) {
            receiverCode = receiverCode + '|' +  params.id.split("|")[j];
          }
          
          receiverCode = receiverCode.substr(1);
          pipeCount = pipeCount + receiverCodeConfig.pipeDelimitedFields
    }else{
        receiverCode = params.id.split("|")[pipeCount];
    }

    const query = {
        listName,
        listVersion,       
        senderCode,
        receiverCode,
    };

    console.log(query)

    const url = `${apiUrl}?${stringify(query)}`;

    const response = await fetch(url, {headers});
    const data = await response.json();

    const reformatted = reformatB2BResponse(data);

    return {
        data : reformatted[0]
    }
}

export const createOneB2BCodelistEntry = async function createOneB2BCodelistEntry(resource, params) {

    let headers = new Headers({ Accept: 'application/json', 'content-type': 'application/json' });
    const authHeader = localStorage.getItem('AuthHeader');
    headers.set('Authorization', authHeader);

    const query = {
        listName : resource,
        listVersion : _.find(config.codelists, function(o) { return o.name === resource; }).listVersion || -1,       
    };

    const url = `${apiUrl}?${stringify(query)}`;

    const response = await fetch(url, {headers});
    const data = await response.json();

    const listVersion = data[0]._id.split("|")[3]

    const CodeList = resource + "|||" + listVersion

    const createData = {
        CodeList,
        codeSet: [
            params.data
        ]
    }

    const createUrl = `${apiUrl}`;

    const createResponse = await fetch(createUrl, {headers,
                                    method: 'POST',
                                    body:  JSON.stringify(createData),
                                    });
    await createResponse.json();

    return {
        data : params.data
    }

}

export const deleteOneB2BCodelistEntry = async function deleteOneB2BCodelistEntry(resource, params) {

    let headers = new Headers({ Accept: 'application/json', 'content-type': 'application/json' });
    const authHeader = localStorage.getItem('AuthHeader');
    headers.set('Authorization', authHeader);

    const url = `${apiUrl}${(params.id)}`;

    await fetch(url, {headers,
        method: 'DELETE',
        });

    return {
        data : params.previousData
    }

}

export const updateOneB2BCodelistEntry = async function updateOneB2BCodelistEntry(resource, params) {

    let headers = new Headers({ 'content-type': 'application/json'});
    const authHeader = localStorage.getItem('AuthHeader');
    headers.set('Authorization', authHeader);

    const url = `${apiUrl}${(params.id)}`;

    await fetch(url, {headers,
        method: 'PUT',
        body: JSON.stringify(params.data),
        mode: 'cors'
        });

    return {
        data : params.data
    }

}