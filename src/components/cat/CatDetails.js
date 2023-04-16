import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCatByIdApiCall } from '../../apiCalls/catApiCalls'
import CatDetailsData from "./CatDetailsData";
import {useTranslation} from "react-i18next";

function CatDetails() {
    const { t } = useTranslation();
    let { catId } = useParams()
    catId = parseInt(catId)
    const [cat, setCat] = useState({})
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState(null)
    function fetchCatDetails() {
        getCatByIdApiCall(catId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setCat(null)
                        setMessage(data.message)
                    } else {
                        setCat(data)
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
        fetchCatDetails()
    }, [])

    let content;

    if (error) {
        content = <p>{t('cat.misc.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('cat.misc.loading')}...</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <CatDetailsData catData={cat} />
    }
    return (
        <main>
            <h2>{t('cat.misc.details')}</h2>
            { content }
            <div className="form-buttons">
                <Link to="/cats" className="form-button-cancel">{t('buttons.returnBtn')}</Link>
            </div>
        </main>
    )
}
export default CatDetails