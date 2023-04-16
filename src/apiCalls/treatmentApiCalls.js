const treatmentsBaseUrl = 'http://localhost:3000/api/treatments'
export function getTreatmentsApiCall() {
    const promise = fetch(treatmentsBaseUrl)
    return promise;
}

export function getTreatmentByIdApiCall(treatmentId) {
    const url = `${treatmentsBaseUrl}/${treatmentId}`;
    const promise = fetch(url);
    return promise;
}
export function addTreatmentApiCall(treatment) {
    const treatmentString = JSON.stringify(treatment)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: treatmentString
    }
    const promise = fetch(treatmentsBaseUrl, options);
    return promise;
}
export function updateTreatmentApiCall(treatmentId, treatment) {
    const url = `${treatmentsBaseUrl}/${treatmentId}`
    const treatmentString = JSON.stringify(treatment)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: treatmentString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteTreatmentApiCall(treatmentId) {
    const url = `${treatmentsBaseUrl}/${treatmentId}`
    const options = {
        method: 'DELETE'
    }
    const promise = fetch(url, options);
    return promise
}
