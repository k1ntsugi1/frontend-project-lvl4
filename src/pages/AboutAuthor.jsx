
import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { useDispatch} from "react-redux";
import { actionsUiNavBar } from "../slices/uiNavbarSlice.js";
import cn from 'classnames';

const AboutAuthor = ({t}) => {
    const classNamesP = cn('px-3', 'lh-base');
    const classnamesContacts = cn('fw-bold');
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(actionsUiNavBar.setNewActivePage({newActivePage: 'about'}))
    }, [])
    return (
        <div className="d-flex flex-column h-100 my-4 pt-5 rounded shadow border border-info">
            <div className="flex-grow-1">
                <h3 className="text-center pb-4">
                    Привет! Меня зовут Булат и это мой заключительный проект на <a className="link-success" href="https://ru.hexlet.io/">Hexlet</a>.
                </h3>
                <p className={classNamesP}>
                    Цель данного проекта - написать real-time приложение (аналог Slack-чата) на React/Redux, 
                    используя AJAX, REST, websockets, React (с хуками) + Redux (@reduxjs/toolkit) + Formik.
                </p>
                <p className={classNamesP}>
                    Для упрощения создания внешнего вида, в этом проекте используется библиотеки bootstrap и react-bootstrap.
                </p>
                <p className={classNamesP}>
                    Код серверной части и первоначальная настройка плагинов и webpack предоставлены командой <a className="link-success" href="https://ru.hexlet.io/">Hexlet</a>.
                    За мной же стоит вся фронтенд часть.
                </p>
                <p className={classNamesP}>
                    Приятного времяпрепровождения!
                </p>
            </div>
            
            <footer className="bg-light border border-top">
                <h4 className="text-center">Контактная информация</h4>
                <div className="d-flex flex-row justify-content-around pb-3">
                    <span className={classnamesContacts}>
                        Mail: <span>bmasalimov5@yandex.ru</span>
                    </span>
                    <span className="fw-bold pe-3">
                        Telegram: <a className="link-success" href="https://t.me/bmasalimov" alt="telegram">https://t.me/bmasalimov</a>
                    </span>
                    <span className={classnamesContacts}>
                        Телефон: <span>+7(909)-745-62-88</span>
                    </span>
                </div>
            </footer>
        </div>  
    )
}

export default withTranslation()(AboutAuthor)