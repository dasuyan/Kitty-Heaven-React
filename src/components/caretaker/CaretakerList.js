import {Link} from "react-router-dom";
import { getCaretakersApiCall } from '../../apiCalls/caretakerApiCalls'
import {useEffect, useState} from "react";
import CaretakerListTable from "./CaretakerListTable";
import {useTranslation} from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";

function CaretakerList() {
    const { t } = useTranslation();
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [caretakers, setCaretakers] = useState([])
    function fetchCaretakerList() {
        getCaretakersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCaretakers(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    useEffect(() => {
        fetchCaretakerList()
    }, [])

    let content;

    if (error) {
        content = <p>{t('caretaker.misc.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('caretaker.misc.loading')}...</p>
    } else {
        content = <CaretakerListTable caretakerList={caretakers} />
    }

    return (
        <main>
            <h2>{t('caretaker.list.title')}</h2>
            { content }
            {isAuthenticated() &&
            <p className="form-buttons">
                <Link to="/caretakers/add" className="form-button-submit">{t('caretaker.list.addNew')}</Link>
            </p>
            }
        </main>
    )
}

export default CaretakerList