import { Link } from "react-router-dom"
import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation} from "react-i18next";
import {getLoggedUserId, isAdmin, isAuthenticated} from "../../helpers/authHelper";
import {deleteCatApiCall} from "../../apiCalls/catApiCalls";
import {deleteSpecializationApiCall} from "../../apiCalls/specializationApiCalls";

function SpecializationListTableRow(props) {
    const { t } = useTranslation();
    const specialization = props.specializationData
    const pass = getLoggedUserId() === specialization.caretaker._id
    console.log(pass)
    if (pass || isAdmin())
    return (
        <tr>
            <td>{specialization.treatment.name}</td>
            <td>{specialization.caretaker.name + " " + specialization.caretaker.surname}</td>
            <td>{specialization.certificate}</td>
            <td>{specialization.certificationYear}</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li><Link to={`/specializations/details/${specialization._id}`} className="list-actions-button-details">{t('buttons.detailsBtn')}</Link></li>
                    <li><Link to={`/specializations/edit/${specialization._id}`} className="list-actions-button-edit">{t('buttons.editBtn')}</Link></li>
                    <li className="list-actions-button-delete" onClick={()=> {deleteSpecializationApiCall(specialization._id).then(r => r.text()); window.location.reload(); window.location.reload()} } >{t('buttons.deleteBtn')}</li>
                </ul>
            </td>
            }
        </tr>
    )
}

export default SpecializationListTableRow