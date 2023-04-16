import { getFormattedDate } from "../../helpers/dateHelper"
import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function TreatmentDetailsData(props) {
    const { t } = useTranslation();
    const treatment = props.treatmentData
    return (
        <>
            <p>{t('treatment.fields.name')}: {treatment.name}</p>
            <p>{t('treatment.fields.cost')}: {treatment.cost} </p>
            <p>{t('treatment.fields.contraindications')}: {treatment.contraindications} </p>
            <h2>{t('treatment.form.specialization')}</h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('specialization.fields.caretaker')}</th>
                    <th>{t('specialization.fields.certificate')}</th>
                    <th>{t('specialization.fields.certificationYear')}</th>
                </tr>
                </thead>
                <tbody>
                {treatment.specializations.map(
                    specialization =>
                        <tr key={specialization._id}>
                            <td><Link to={"/caretakers/details/" + specialization.caretaker._id}>{specialization.caretaker.name + " " + specialization.caretaker.surname}</Link></td>
                            <td>{specialization.certificate}</td>
                            <td>{specialization.certificationYear}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default TreatmentDetailsData