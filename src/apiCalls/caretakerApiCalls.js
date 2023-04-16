import {getCurrentUser} from "../helpers/authHelper";

const caretakersBaseUrl = 'http://localhost:3000/api/caretakers'
export function getCaretakersApiCall() {
    const promise = fetch(caretakersBaseUrl)
    return promise;
}

export function getCaretakerByIdApiCall(caretakerId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${caretakersBaseUrl}/${caretakerId}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const promise = fetch(url, options);
    return promise;
}
export function addCaretakerApiCall(caretaker) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const caretakerString = JSON.stringify(caretaker)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: caretakerString
    }
    const promise = fetch(caretakersBaseUrl, options);
    return promise;
}
export function updateCaretakerApiCall(caretakerId, caretaker) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    console.log(token)
    const url = `${caretakersBaseUrl}/${caretakerId}`
    const caretakerString = JSON.stringify(caretaker)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: caretakerString
    }
    const promise = fetch(url, options);
    return promise;
}
export function deleteCaretakerApiCall(caretakerId) {
    const url = `${caretakersBaseUrl}/${caretakerId}`
    const options = {
        method: 'DELETE'
    }
    const promise = fetch(url, options);
    return promise
}