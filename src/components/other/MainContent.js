import {useTranslation} from "react-i18next";

function MainContent() {
    const { t } = useTranslation();
    return (
        <main>
            <h2>{t('main-page.content')}</h2>
            <p>Welcome to the Kitty Heaven SPA!!!
            </p>
            <div className="background">
            </div>
        </main>

    )
}

export default MainContent