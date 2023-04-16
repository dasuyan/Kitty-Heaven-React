import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";
import {deleteCatApiCall} from "../../apiCalls/catApiCalls";


function CatListTableRow(props) {
    const { t } = useTranslation();
    const cat = props.catData
    return (
        <tr>
            <td>{cat.name}</td>
            <td>{cat.age}</td>
            <td>{cat.breed}</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li><Link to={`/cats/details/${cat._id}`} className="list-actions-button-details">{t('buttons.detailsBtn')}</Link></li>
                    <li><Link to={`/cats/edit/${cat._id}`} className="list-actions-button-edit">{t('buttons.editBtn')}</Link></li>
                    <li className="list-actions-button-delete" onClick={()=> {deleteCatApiCall(cat._id).then(r => r.text()); window.location.reload(); window.location.reload()} } >{t('buttons.deleteBtn')}</li>
                </ul>
            </td>
            }
        </tr>
    )
}

export default CatListTableRow