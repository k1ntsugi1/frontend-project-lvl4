
import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { useDispatch} from "react-redux";
import { actionsUiNavBar } from "../slices/uiNavbarSlice.js";
import cn from 'classnames';

const AboutAuthorPage = ({t}) => {
    const classNamesP = cn('px-3', 'lh-base');
    const classnamesSpan = cn('px-2');
    const classnamesContacts = cn('fw-bold');
    const classnamesLinks = cn('text-decoration-none', 'link-success')
    const dispatch = useDispatch();
    const handlerOpening = (e,url) => {
        e.preventDefault();
        window.open(url)   
    }
    useEffect( () => {
        dispatch(actionsUiNavBar.setNewActivePage({newActivePage: 'about'}))
    }, [])
    return (
        <div className="d-flex flex-column h-100 my-4 pt-5 rounded shadow border border-info bg-white">
            <div className="flex-grow-1">
                <h3 className="text-center pb-4">
                    Привет! Меня зовут Булат и это мой заключительный проект на{' '} 
                    <a className="link-success" 
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
                    Для упрощения создания внешнего вида, в этом проекте используется библиотеки bootstrap и react-bootstrap.
                </p>
                <p className={classNamesP}>
                    Код серверной части и первоначальная настройка плагинов и webpack предоставлены командой{' '}
                    <a className="link-success" 
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
                <p className='px-3 lh-base text-center'>
                    Приятного времяпрепровождения!
                </p>
            </div>
            
            <footer className="bg-light border border-top">
                <h5 className="text-center">Контактная информация</h5>
                <div className="d-flex flex-row justify-content-around pb-2">
                    <div className={classnamesContacts}>
                        <img src="https://cdn.icon-icons.com/icons2/858/PNG/512/letter_icon-icons.com_67753.png" width="20px"  alt="MailImg"/>
                        <span className={classnamesSpan}>bmasalimov5@yandex.ru</span>
                    </div>
                    <div className="fw-bold pe-3">
                        <img src="https://cdn.icon-icons.com/icons2/923/PNG/512/telegram_icon-icons.com_72055.png" width="20px"  alt="telegramImg"/>
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
                        <img src="https://cdn.icon-icons.com/icons2/2406/PNG/512/github_git_icon_145985.png" width="20px"  alt="telegramImg"/>
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
                        <img src="https://cdn.icon-icons.com/icons2/1129/PNG/512/cellphone_79786.png" width="20px"  alt="phoneImg"/>
                         <span className={classnamesSpan}>+7(909)-745-62-88</span>
                    </div>
                </div>
            </footer>
        </div>  
    )
}

export default withTranslation()(AboutAuthorPage)