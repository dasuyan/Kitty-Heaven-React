import { getFormattedDate } from '../../helpers/dateHelper';
import {useTranslation} from "react-i18next";

function SpecializationDetailsData(props) {
    const { t } = useTranslation();
    const specialization = props.specializationData
    return (
        <>
            <p>{t('specialization.fields.treatment')}: {specialization.treatment.name}</p>
            <p>{t('specialization.fields.caretaker')}: {specialization.caretaker.name + " " + specialization.caretaker.surname} </p>
            <p>{t('specialization.fields.certificate')}: {specialization.certificate} </p>
            <p>{t('specialization.fields.certificationYear')}: {specialization.certificationYear} </p>
        </>
    )
}

export default SpecializationDetailsData