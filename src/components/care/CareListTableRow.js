import { Link } from "react-router-dom"
import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation} from "react-i18next";
import {getLoggedUserId, isAdmin, isAuthenticated} from "../../helpers/authHelper";
import {deleteCatApiCall} from "../../apiCalls/catApiCalls";
import {deleteCareApiCall} from "../../apiCalls/careApiCalls";

function CareListTableRow(props) {
    const { t } = useTranslation();
    const care = props.careData
    const pass = getLoggedUserId() === care.caretaker._id
    console.log(pass)
    if (pass || isAdmin())
    return (
        <tr>
            <td>{care.cat.name}</td>
            <td>{care.caretaker.name + " " + care.caretaker.surname}</td>
            <td>{care.dateFrom ? getFormattedDate(care.dateFrom) : ""}</td>
            <td>{care.dateTo ? getFormattedDate(care.dateTo) : ""}</td>
            <td>{care.totalCost}</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li><Link to={`/cares/details/${care._id}`} className="list-actions-button-details">{t('buttons.detailsBtn')}</Link></li>
                    <li><Link to={`/cares/edit/${care._id}`} className="list-actions-button-edit">{t('buttons.editBtn')}</Link></li>
                    <li className="list-actions-button-delete" onClick={()=> {deleteCareApiCall(care._id).then(r => r.text()); window.location.reload(); window.location.reload()} } >{t('buttons.deleteBtn')}</li>
                </ul>
            </td>
            }
        </tr>
    )
}

export default CareListTableRow