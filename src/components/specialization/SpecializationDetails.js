import { Link, useParams } from 'react-router-dom'
import { getSpecializationByIdApiCall } from '../../apiCalls/specializationApiCalls'
import {useEffect, useState} from "react";
import SpecializationDetailsData from "./SpecializationDetailsData";
import {useTranslation} from "react-i18next";

function SpecializationDetails() {
    const { t } = useTranslation();
    const [specialization, setSpecialization] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    let { specializationId } = useParams()
    specializationId = parseInt(specializationId)

    function fetchSpecializationDetails() {
        getSpecializationByIdApiCall(specializationId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setSpecialization(null)
                        setMessage(data.message)
                    } else {
                        setSpecialization(data)
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
        fetchSpecializationDetails()
    }, [])

    let content

    if (error) {
        content = <p>{t('specialization.misc.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('specialization.misc.loading')}...</p>
    } else {
        content = <SpecializationDetailsData specializationData={specialization} />
    }

    return (
        <main>
            <h2>{t('specialization.misc.details')}</h2>
            { content }
            <div className="form-buttons">
                <Link to="/specializations" className="form-button-cancel">{t('buttons.returnBtn')}</Link>
            </div>
        </main>
    )
}

export default SpecializationDetails