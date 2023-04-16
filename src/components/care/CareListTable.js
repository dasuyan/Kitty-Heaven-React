import CareListTableRow from './CareListTableRow'
import {useTranslation} from "react-i18next";

function CareListTable(props) {
    const { t } = useTranslation();
    const cares = props.caresList
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('care.fields.cat')}</th>
                <th>{t('care.fields.caretaker')}</th>
                <th>{t('care.fields.dateFrom')}</th>
                <th>{t('care.fields.dateTo')}</th>
                <th>{t('care.fields.totalCost')}</th>
                <th>{t('buttons.actions')}</th>
            </tr>
            </thead>
            <tbody>
            {cares.map(care =>
                <CareListTableRow careData={care} key={care._id} />
            )}
            </tbody>
        </table>
    )
}

export default CareListTable