import {useEffect} from "react";

const catsBaseUrl = 'http://localhost:3000/api/cats'
export function getCatsApiCall() {
    const promise = fetch(catsBaseUrl)
    return promise;
}

export function getCatByIdApiCall(catId) {
    const url = `${catsBaseUrl}/${catId}`;
    const promise = fetch(url);
    return promise;
}
export function addCatApiCall(cat) {
    const catString = JSON.stringify(cat)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: catString
    }
    const promise = fetch(catsBaseUrl, options);
    return promise;
}
export function updateCatApiCall(catId, cat) {
    const url = `${catsBaseUrl}/${catId}`
    const catString = JSON.stringify(cat)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: catString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteCatApiCall(catId) {
    const url = `${catsBaseUrl}/${catId}`
    const options = {
        method: 'DELETE'
    }
    const promise = fetch(url, options);
    return promise
}