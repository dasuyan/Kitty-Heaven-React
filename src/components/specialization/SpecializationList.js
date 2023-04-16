import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import {getSpecializationsApiCall} from "../../apiCalls/specializationApiCalls";
import SpecializationListTable from "./SpecializationListTable";
import {useTranslation} from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";

function SpecializationList() {
    const { t } = useTranslation();
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [specializations, setSpecializations] = useState([])
    let content;

    function fetchSpecializationsList() {
        getSpecializationsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setSpecializations(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchSpecializationsList()
    }, [])

    if (error) {
        content = <p>{t('specialization.misc.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('specialization.misc.loading')}...</p>
    } else if (specializations.length === 0) {
        content = <p>{t('specialization.list.noData')}</p>
    } else {
        content = <SpecializationListTable specializationsList={specializations} />
    }

    return (
        <main>
            <h2>{t('specialization.list.title')}</h2>
            { content }
            {isAuthenticated() &&
            <p className="form-buttons">
                <Link to="/specializations/add" className="form-button-submit">{t('specialization.list.addNew')}</Link>
            </p>
            }
        </main>
    )
}

export default SpecializationList