const caresBaseUrl = 'http://localhost:3000/api/cares'

export function getCaresApiCall() {
    const promise = fetch(caresBaseUrl)
    return promise;
}
export function getCareByIdApiCall(careId) {
    const url = `${caresBaseUrl}/${careId}`;
    const promise = fetch(url);
    return promise;
}

export function addCareApiCall(care) {
    const careString = JSON.stringify(care)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: careString
    }
    const promise = fetch(caresBaseUrl, options);
    return promise;
}
export function updateCareApiCall(careId, care) {
    const url = `${caresBaseUrl}/${careId}`
    const careString = JSON.stringify(care)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: careString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteCareApiCall(careId) {
    const url = `${caresBaseUrl}/${careId}`
    const options = {
        method: 'DELETE'
    }
    const promise = fetch(url, options);
    return promise
}