
import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { useDispatch} from "react-redux";
import { actionsUiNavBar } from "../slices/uiNavbarSlice.js";
import cn from 'classnames';

import PhoneImg from '../myAssets/img/phone.png';
import GithubImg from '../myAssets/img/github.png';
import TelegramImg from '../myAssets/img/telegram.png';
import MailImg from '../myAssets/img/mail.png';
import MeFirst from '../myAssets/img/me1.jpg';
import MeSecond from '../myAssets/img/me2.jpg';
import MeThird from '../myAssets/img/me3.jpg';

const AboutAuthorPage = ({t}) => {
    const classNamesP = cn('px-3', 'lh-base');
    const classnamesSpan = cn('px-2');
    const classnamesContacts = cn('fw-bold');
    const classnamesLinks = cn('text-decoration-none', 'link-success');
    const classnamesMyImg = cn('rounded-circle')
    const dispatch = useDispatch();
    const handlerOpening = (e,url) => {
        e.preventDefault();
        window.open(url)   
    }
    useEffect( () => {
        dispatch(actionsUiNavBar.setNewActivePage({newActivePage: 'about'}))
    }, [])
    return (
        <div className="my-4 pt-3 h-90 d-flex flex-column shadow border border-success rounded bg-light">
            <div className="mb-0 flex-grow-1 scrollbar2 scrollbar-success">
                    <h3 className="pb-4 text-center">
                        Привет! Меня зовут Булат и это мой заключительный проект на{' '} 
                        <a  className="link-success" 
                            href="#" 
                            onClick={(e) => handlerOpening(e,"https://ru.hexlet.io/")}
                        >
                            Hexlet
                        </a>.
                    </h3>
                    <p className={classNamesP}>
                        Цель данного проекта - написать real-time приложение (аналог Slack-чата) на React/Redux, 
                        используя AJAX, REST, websockets, React (с хуками) + Redux (@reduxjs/toolkit) + Formik.
                    </p>
                    <p className={classNamesP}>
                        Дополнительно использовались следующие пакеты: react-toastify, reactjs-popup, react-dom-router, react-rollbar, react-spinner-loader, yup.
                    </p>
                    <p className={classNamesP}>
                        Для упрощения создания внешнего вида, в этом проекте применялись библиотеки bootstrap и react-bootstrap.
                    </p>
                    <p className={classNamesP}>
                        Код серверной части и первоначальная настройка плагинов и webpack предоставлены командой{' '}
                        <a  className="link-success" 
                            href="#" 
                            onClick={(e) => handlerOpening(e,"https://ru.hexlet.io/")}
                        >
                            Hexlet
                        </a>.
                        За мной же стоит вся фронтенд часть.
                    </p>
                    <div className="text-center">
                        <p>
                            Здесь будут красивые ссылки-карточки на мои проекты 
                        </p>
                        <p className="fst-italic text-left">- Какой-то дополнительный и нужный текст</p>
                    </div>
                    <hr/>
                    <h4 className='px-3 lh-base text-center'>
                        Наша великолепная команда
                    </h4>
                    <div className="d-flex flex-row justify-content-around pb-2">
                        <img src={MeSecond} className={classnamesMyImg} width="15%" alt="myPhoto"/>
                        <img src={MeFirst} className={classnamesMyImg} width="15%" alt="myPhoto"/>
                        <img src={MeThird} className={classnamesMyImg} width="15%" alt="myPhoto"/>
                    </div>
            </div>
            
            
            <footer className="border border-top">
                <h5 className="text-center">Контактная информация</h5>
                <div className="d-flex flex-row justify-content-around pb-2">
                    <div className={classnamesContacts}>
                        <img src={MailImg} width="20px"  alt="MailImg"/>
                        <span className={classnamesSpan}>bmasalimov5@yandex.ru</span>
                    </div>
                    <div className="fw-bold pe-3">
                        <img src={TelegramImg} width="20px"  alt="telegramImg"/>
                        <span className={classnamesSpan}>
                            Telegram:{' '}
                            <a className={classnamesLinks} 
                               href="#" 
                               onClick={(e) => handlerOpening(e,"https://t.me/bmasalimov")}
                               alt="telegram"
                            > 
                            https://t.me/bmasalimov
                            </a>
                        </span>
                    </div>
                    <div className="fw-bold pe-3">
                        <img src={GithubImg} width="27px"  alt="GuthubImg"/>
                        <span className={classnamesSpan}>
                            Github:{' '}
                            <a className={classnamesLinks} 
                               href="#" 
                               onClick={(e) => handlerOpening(e,"https://github.com/k1ntsugi1")}
                               alt="Github"
                            >
                                https://github.com/k1ntsugi1
                            </a>
                        </span>
                    </div>
                    <div className={classnamesContacts}>
                        <img src={PhoneImg} width="20px"  alt="phoneImg"/>
                         <span className={classnamesSpan}>+7(909)-745-62-88</span>
                    </div>
                </div>
            </footer>
        </div>  
    )
}

export default withTranslation()(AboutAuthorPage)