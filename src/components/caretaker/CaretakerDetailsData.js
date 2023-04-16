import { getFormattedDate } from "../../helpers/dateHelper"
import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function CaretakerDetailsData(props) {
    const { t } = useTranslation();
    const caretaker = props.caretakerData
    return (
        <>
            <p>{t('caretaker.fields.name')}: {caretaker.name}</p>
            <p>{t('caretaker.fields.surname')}: {caretaker.surname}</p>
            <p>{t('caretaker.fields.email')}: {caretaker.email} </p>
            <p>{t('caretaker.fields.primaryRole')}: {caretaker.primaryRole} </p>
            <h2>{t('caretaker.form.care')}</h2>
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
                {caretaker.cares.map(
                    care =>
                        <tr key={care._id}>
                            <td><Link to={"/cats/details/" + care.cat._id}>{care.cat.name + " " + care.cat.age}</Link></td>
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

export default CaretakerDetailsData