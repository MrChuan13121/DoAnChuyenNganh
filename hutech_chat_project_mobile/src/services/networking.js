import {API_URL} from "@env"

const host = API_URL;
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

const generateUrl = (uri) => {
    return host + "/api/v1/" + uri;
};

export const get = (uri) => {
    return fetch(generateUrl(uri), {
        method: 'GET',
        headers
    });
}

export const post = (uri, params) => {
    return fetch(generateUrl(uri), {
        method: 'POST',
        headers,
        body: JSON.stringify(params)
    });
}