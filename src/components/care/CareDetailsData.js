import { getFormattedDate } from '../../helpers/dateHelper';
import {useTranslation} from "react-i18next";

function CareDetailsData(props) {
    const { t } = useTranslation();
    const care = props.careData
    const careDateFrom = care.dateFrom ? getFormattedDate(care.dateFrom) : ""
    const careDateTo = care.dateTo ? getFormattedDate(care.dateTo) : ""
    return (
        <>
            <p>{t('care.fields.cat')}: {care.cat.name}</p>
            <p>{t('care.fields.caretaker')}: {care.caretaker.name + " " + care.caretaker.surname} </p>
            <p>{t('care.fields.totalCost')}: {care.totalCost} </p>
            <p>{t('care.fields.dateFrom')}: {careDateFrom} </p>
            {careDateTo && <p>{t('care.fields.dateTo')}: {careDateTo} </p>}
        </>
    )
}

export default CareDetailsData