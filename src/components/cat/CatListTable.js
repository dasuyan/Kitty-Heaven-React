import React from 'react';
import CatListTableRow from './CatListTableRow'
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function CatListTable(props) {
    const { t } = useTranslation();
    const cats = props.catList
    return (
        <table className="table-list" >
            <thead>
            <tr>
                <th>{t('cat.fields.name')}</th>
                <th>{t('cat.fields.age')}</th>
                <th>{t('cat.fields.breed')}</th>
                {isAuthenticated() && <th>{t('buttons.actions')}</th> }
            </tr>
            </thead>
            <tbody>
            {cats.map(cat =>
                <CatListTableRow catData={cat} key={cat._id} />
            )}
            </tbody>
        </table >
    )
}

export default CatListTable