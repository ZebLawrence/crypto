import apisauce from 'apisauce';

const create = url => {

    const api = apisauce.create({
        baseURL: url,
        Authorization: 123
    });

    const getData = (endPoint, params) => api.get(endPoint, params);
    const postData = (endPoint, params) => api.post(endPoint, params);
    const putData = (endPoint, params) => api.put(endPoint, params);
    const deleteData = (endPoint, params) => api.delete(endPoint, params);

    return {
        api,
        getData,
        postData,
        putData,
        deleteData
    };
}

export default { create };
