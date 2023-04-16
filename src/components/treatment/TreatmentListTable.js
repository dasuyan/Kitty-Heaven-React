import React from 'react';
import TreatmentListTableRow from './TreatmentListTableRow'
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function TreatmentListTable(props) {
    const { t } = useTranslation();
    const treatments = props.treatmentList
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>{t('treatment.fields.name')}</th>
                <th>{t('treatment.fields.cost')}</th>
                <th>{t('treatment.fields.contraindications')}</th>
                {isAuthenticated() && <th>{t('buttons.actions')}</th> }
            </tr>
            </thead>
            <tbody>
            {treatments.map(treatment =>
                <TreatmentListTableRow treatmentData={treatment} key={treatment._id} />
            )}
            </tbody>
        </table >
    )
}

export default TreatmentListTable