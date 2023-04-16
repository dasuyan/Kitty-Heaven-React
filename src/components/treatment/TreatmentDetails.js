import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTreatmentByIdApiCall } from '../../apiCalls/treatmentApiCalls'
import TreatmentDetailsData from "./TreatmentDetailsData";
import {useTranslation} from "react-i18next";

function TreatmentDetails() {
    const { t } = useTranslation();
    let { treatmentId } = useParams()
    treatmentId = parseInt(treatmentId)
    const [treatment, setTreatment] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)
    function fetchTreatmentDetails() {
        getTreatmentByIdApiCall(treatmentId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setTreatment(null)
                        setMessage(data.message)
                    } else {
                        setTreatment(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )

    }
    useEffect(() => {
        fetchTreatmentDetails()
    }, [])

    let content;

    if (error) {
        content = <p>{t('treatment.misc.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('treatment.misc.loading')}...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <TreatmentDetailsData treatmentData={treatment} />
    }
    return (
        <main>
            <h2>{t('treatment.misc.details')}</h2>
            { content }
            <div className="form-buttons">
                <Link to="/treatments" className="form-button-cancel">{t('buttons.returnBtn')}</Link>
            </div>
        </main>
    )
}
export default TreatmentDetails