import React from 'react';
import CaretakerListTableRow from './CaretakerListTableRow'
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function CaretakerListTable(props) {
    const { t } = useTranslation();
    const caretakers = props.caretakerList
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>{t('caretaker.fields.name')}</th>
                <th>{t('caretaker.fields.surname')}</th>
                <th>{t('caretaker.fields.email')}</th>
                <th>{t('caretaker.fields.primaryRole')}</th>
                {isAuthenticated() && <th>{t('buttons.actions')}</th> }
            </tr>
            </thead>
            <tbody>
            {caretakers.map(caretaker =>
                <CaretakerListTableRow caretakerData={caretaker} key={caretaker._id} />
            )}
            </tbody>
        </table >
    )
}

export default CaretakerListTable