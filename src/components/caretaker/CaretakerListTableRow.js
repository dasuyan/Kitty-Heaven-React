import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";
import { isAdmin } from "../../helpers/authHelper";
import {deleteCatApiCall} from "../../apiCalls/catApiCalls";
import {deleteCaretakerApiCall} from "../../apiCalls/caretakerApiCalls";
function CaretakerListTableRow(props) {
    const { t } = useTranslation();
    const caretaker = props.caretakerData
    return (
        <tr>
            <td>{caretaker.name}</td>
            <td>{caretaker.surname}</td>
            <td>{caretaker.email}</td>
            <td>{caretaker.primaryRole}</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li><Link to={`/caretakers/details/${caretaker._id}`} className="list-actions-button-details">{t('buttons.detailsBtn')}</Link></li>
                    { isAdmin() && <li><Link to={`/caretakers/edit/${caretaker._id}`} className="list-actions-button-edit">{t('buttons.editBtn')}</Link></li> }
                    { isAdmin() && <li className="list-actions-button-delete" onClick={()=> {deleteCaretakerApiCall(caretaker._id).then(r => r.text()); window.location.reload(); window.location.reload()} } >{t('buttons.deleteBtn')}</li> }
                </ul>
            </td>
            }
        </tr>
    )
}

export default CaretakerListTableRow