
import React from "react";
import { withTranslation } from "react-i18next";

const AboutUs = ({t}) => {
    return (
        <div className="col">
            <p>
                Привет!
            </p>
        </div>
    )
}

export default withTranslation()(AboutUs)