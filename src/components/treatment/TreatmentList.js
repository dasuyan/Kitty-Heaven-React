import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import TreatmentListTable from "./TreatmentListTable";
import {useTranslation} from "react-i18next";
import {getTreatmentsApiCall} from "../../apiCalls/treatmentApiCalls";
import { isAuthenticated } from "../../helpers/authHelper";

function TreatmentList() {
    const { t } = useTranslation();
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [treatments, setTreatments] = useState([])

    function fetchTreatmentList() {
        getTreatmentsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setTreatments(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    useEffect(() => {
        fetchTreatmentList()
    }, [])

    let content;

    if (error) {
        content = <p>{t('treatment.misc.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('treatment.misc.loading')}...</p>
    } else {
        content = <TreatmentListTable treatmentList={treatments} />
    }

    return (
        <main>
            <h2>{t('treatment.list.title')}</h2>
            { content }
            {isAuthenticated() &&
            <p className="form-buttons">
                <Link to="/treatments/add" className="form-button-submit">{t('treatment.list.addNew')}</Link>
            </p>
            }
        </main>
    )
}

export default TreatmentList