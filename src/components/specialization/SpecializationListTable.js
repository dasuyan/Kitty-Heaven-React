import SpecializationListTableRow from './SpecializationListTableRow'
import {useTranslation} from "react-i18next";

function SpecializationListTable(props) {
    const { t } = useTranslation();
    const specializations = props.specializationsList
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('specialization.fields.treatment')}</th>
                <th>{t('specialization.fields.caretaker')}</th>
                <th>{t('specialization.fields.certificate')}</th>
                <th>{t('specialization.fields.certificationYear')}</th>
                <th>{t('buttons.actions')}</th>
            </tr>
            </thead>
            <tbody>
            {specializations.map(specialization =>
                <SpecializationListTableRow specializationData={specialization} key={specialization._id} />
            )}
            </tbody>
        </table>
    )
}

export default SpecializationListTable