import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import {getCaresApiCall} from "../../apiCalls/careApiCalls";
import CareListTable from "./CareListTable";
import {useTranslation} from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";

function CareList() {
    const { t } = useTranslation();
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [cares, setCares] = useState([])
    let content;

    function fetchCaresList() {
        getCaresApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCares(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchCaresList()
    }, [])

    if (error) {
        content = <p>{t('care.misc.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('care.misc.loading')}...</p>
    } else if (cares.length === 0) {
        content = <p>{t('care.list.noData')}</p>
    } else {
        content = <CareListTable caresList={cares} />
    }

    return (
        <main>
            <h2>{t('care.list.title')}</h2>
            { content }
            {isAuthenticated() &&
            <p className="form-buttons">
                <Link to="/cares/add" className="form-button-submit">{t('care.list.addNew')}</Link>
            </p>
            }
        </main>
    )
}

export default CareList