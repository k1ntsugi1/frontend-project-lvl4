
import React from "react";
import { withTranslation } from "react-i18next";


const ErrorDisplay = ({t}) => {
    return (
        <div className="p-3 position-absolute top-50 start-50 bg-light border border-danger">
            <h3 className="text-center">{t("mainError.header")}</h3>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{t("mainError.suggestion")}</li>
                <li className="ps-2 list-group-item list-group-item-success">{t("mainError.firstStep")}</li>
                <li className="ps-2 list-group-item list-group-item-success">{t("mainError.secondStep")}</li>
            </ul>
        </div>
    )
};

export default withTranslation()(ErrorDisplay)

