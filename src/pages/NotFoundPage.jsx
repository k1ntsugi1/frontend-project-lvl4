
import React from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export const NotFoundPage = ({t, setNewAdditionalNavBtn}) => {
    setNewAdditionalNavBtn(null);
    return (
        <div className='position-relative row justify-content-center h-100'>
            <div className='position-absolute top-0 text-muted text-center'>
                <h2>{t("undefindPage.haveNotFindedPage")}</h2>
                <span>{t("undefindPage.suggestion")} <Link to='/'>{t("undefindPage.linkToMainPage")}</Link></span>
            </div>
            <div className='mt-5'>
                <img src="https://raw.githubusercontent.com/k1ntsugi1/layout-designer-project-lvl1/main/src/assets/images/main.png" className='img-fluid' alt="Страница не найдена"/>
            </div>
        </div>
    )
}

export default withTranslation()(NotFoundPage)