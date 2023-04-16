import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CatListTable from "./CatListTable";
import {useTranslation} from "react-i18next";
import {getCatsApiCall} from "../../apiCalls/catApiCalls";
import { isAuthenticated } from "../../helpers/authHelper";

function CatList() {
    const { t } = useTranslation();
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [cats, setCats] = useState([])

    function fetchCatList() {
        getCatsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCats(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }
    useEffect(() => {
        fetchCatList()
    }, [])

    let content;

    if (error) {
        content = <p>{t('cat.misc.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('cat.misc.loading')}...</p>
    } else {
        content = <CatListTable catList={cats} />
    }

    return (
        <main>
            <h2>{t('cat.list.title')}</h2>
            { content }
            {isAuthenticated() &&
            <p className="form-buttons">
                <Link to="/cats/add" className="form-button-submit">{t('cat.list.addNew')}</Link>
            </p>
            }
        </main>
    )
}

export default CatList