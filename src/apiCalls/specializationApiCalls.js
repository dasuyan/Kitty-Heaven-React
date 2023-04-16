const specializationsBaseUrl = 'http://localhost:3000/api/specializations'

export function getSpecializationsApiCall() {
    const promise = fetch(specializationsBaseUrl)
    return promise;
}
export function getSpecializationByIdApiCall(specializationId) {
    const url = `${specializationsBaseUrl}/${specializationId}`;
    const promise = fetch(url);
    return promise;
}

export function addSpecializationApiCall(specialization) {
    const specializationString = JSON.stringify(specialization)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: specializationString
    }
    const promise = fetch(specializationsBaseUrl, options);
    return promise;
}
export function updateSpecializationApiCall(specializationId, specialization) {
    const url = `${specializationsBaseUrl}/${specializationId}`
    const specializationString = JSON.stringify(specialization)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: specializationString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteSpecializationApiCall(specializationId) {
    const url = `${specializationsBaseUrl}/${specializationId}`
    const options = {
        method: 'DELETE'
    }
    const promise = fetch(url, options);
    return promise
}