
import React from "react";
import { withTranslation } from "react-i18next";
import ErrorImg from '../../myAssets/img/404page.png';
import cn from 'classnames';

const ErrorDisplay = ({t}) => {
    const classnamesLi = cn('ps-4', 'list-group-item', 'list-group-item-success');
    return (
        <div className="p-3 position-relative bg-light border border-danger shadow-danger">
            <h3 className="text-center">{t("mainError.header")}</h3>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{t("mainError.suggestion")}</li>
                <li className={classnamesLi}>{t("mainError.firstStep")}</li>
                <li className={classnamesLi}>{t("mainError.secondStep")}</li>
                <li className={classnamesLi}>{t("mainError.thirdStep")}</li>
            </ul>
            <img src={ErrorImg} alt="errorImg" className="mx-auto w-50 d-block"/>
        </div>
    )
};

export default withTranslation()(ErrorDisplay)

