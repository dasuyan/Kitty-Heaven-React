import { Link } from 'react-router-dom'
import { withTranslation } from "react-i18next";
import React from 'react'
import {isAuthenticated} from "../../helpers/authHelper";


class Navigation extends React.Component {
    handleLanguageChange = (language) => {
        const {i18n} = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log("something went wrong", err);
        });
    }

    render() {
        const {t} = this.props
        const loginLogoutLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>{t('buttons.logout')}</button> : <Link to="/login">{t('buttons.login')}</Link>

        return (
            <nav>
                <ul>
                    <li><Link to="/">{t('nav.main-page')}</Link></li>
                    <li><Link to="/cats">{t('nav.cats')}</Link></li>
                    <li><Link to="/caretakers">{t('nav.caretakers')}</Link></li>
                    { isAuthenticated() && <li><Link to="/cares">{t('nav.cares')}</Link></li> }
                    { isAuthenticated() && <li><Link to="/specializations">{t('nav.specializations')}</Link></li> }
                    <li><Link to="/treatments">{t('nav.treatments')}</Link></li>
                    <li className='lang'>{loginLogoutLink}</li>
                    <li>
                        <button onClick={() => {
                            this.handleLanguageChange('pl')
                        }}>PL
                        </button>
                    </li>
                    <li>
                        <button onClick={() => {
                            this.handleLanguageChange('en')
                        }}>EN
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withTranslation() (Navigation)