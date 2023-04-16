import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getCaretakerByIdApiCall} from "../../apiCalls/caretakerApiCalls";
import CaretakerDetailsData from "../caretaker/CaretakerDetailsData";
import {useTranslation} from "react-i18next";

function CaretakerDetails() {
    const { t } = useTranslation();
    let { caretakerId } = useParams()
    caretakerId = parseInt(caretakerId)
    const [caretaker, setCaretaker] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)
    function fetchCaretakerDetails() {
        getCaretakerByIdApiCall(caretakerId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setCaretaker(null)
                        setMessage(data.message)
                    } else {
                        setCaretaker(data)
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
        fetchCaretakerDetails()
    }, [])

    let content;

    if (error) {
        content = <p>{t('caretaker.misc.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('caretaker.misc.loading')}...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <CaretakerDetailsData caretakerData={caretaker} />
    }
    return (
        <main>
            <h2>{t('caretaker.misc.details')}</h2>
            { content }
            <div className="form-buttons">
                <Link to="/caretakers" className="form-button-cancel">{t('buttons.returnBtn')}</Link>
            </div>
        </main>
    )
}
export default CaretakerDetails