import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {getLoggedUserId, isAuthenticated} from "../../helpers/authHelper";
import {deleteTreatmentApiCall} from "../../apiCalls/treatmentApiCalls";


function TreatmentListTableRow(props) {
    const { t } = useTranslation();
    const treatment = props.treatmentData
    return (
        <tr>
            <td>{treatment.name}</td>
            <td>{treatment.cost}</td>
            <td>{treatment.contraindications}</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li><Link to={`/treatments/details/${treatment._id}`} className="list-actions-button-details">{t('buttons.detailsBtn')}</Link></li>
                    <li><Link to={`/treatments/edit/${treatment._id}`} className="list-actions-button-edit">{t('buttons.editBtn')}</Link></li>
                    <li className="list-actions-button-delete" onClick={()=> {deleteTreatmentApiCall(treatment._id).then(r => r.text()); window.location.reload(); window.location.reload()} } >{t('buttons.deleteBtn')}</li>
                </ul>
            </td>
            }
        </tr>
    )
}

export default TreatmentListTableRow