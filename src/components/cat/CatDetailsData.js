import { getFormattedDate } from "../../helpers/dateHelper"
import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function CatDetailsData(props) {
    const { t } = useTranslation();
    const cat = props.catData
    return (
        <>
            <p>{t('cat.fields.name')}: {cat.name}</p>
            <p>{t('cat.fields.age')}: {cat.age} </p>
            <p>{t('cat.fields.breed')}: {cat.breed} </p>
            <h2>{t('cat.form.care')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('care.fields.caretaker')}</th>
                    <th>{t('care.fields.totalCost')}</th>
                    <th>{t('care.fields.dateFrom')}</th>
                    <th>{t('care.fields.dateTo')}</th>
                </tr>
                </thead>
                <tbody>
                {cat.cares.map(
                    care =>
                        <tr key={care._id}>
                            <td><Link to={"/caretakers/details/" + care.caretaker._id}>{care.caretaker.name + " " + care.caretaker.surname}</Link></td>
                            <td>{care.totalCost}</td>
                            <td>{care.dateFrom ? getFormattedDate(care.dateFrom) : ""}</td>
                            <td>{care.dateTo ? getFormattedDate(care.dateTo) : ""}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default CatDetailsData