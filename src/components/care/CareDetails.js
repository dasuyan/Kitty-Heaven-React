import { Link, useParams } from 'react-router-dom'
import { getCareByIdApiCall } from '../../apiCalls/careApiCalls'
import {useEffect, useState} from "react";
import CareDetailsData from "./CareDetailsData";
import {useTranslation} from "react-i18next";

function CareDetails() {
    const { t } = useTranslation();
    const [care, setCare] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)

    let { careId } = useParams()
    careId = parseInt(careId)

    function fetchCareDetails() {
        getCareByIdApiCall(careId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setCare(null)
                        setMessage(data.message)
                    } else {
                        setCare(data)
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
        fetchCareDetails()
    }, [])

    let content

    if (error) {
        content = <p>{t('care.misc.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('care.misc.loading')}...</p>
    } else {
        content = <CareDetailsData careData={care} />
    }

    return (
        <main>
            <h2>{t('care.misc.details')}</h2>
            { content }
            <div className="form-buttons">
                <Link to="/cares" className="form-button-cancel">{t('buttons.returnBtn')}</Link>
            </div>
        </main>
    )
}

export default CareDetails