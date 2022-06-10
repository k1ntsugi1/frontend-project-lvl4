
import { toast } from 'react-toastify';

const toastes = {
    "greeting": (t, usermame) => {
        return (
            toast(`🚀 ${t("toastText.greeting")} ${usermame}!`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        )
    },
    "badWord": (t) => {
        return (
            toast(`💩 ${t("toastText.badWord")}!`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        )
    },
    'newChannel': (t, name) => {
        return (
            toast(`⭐ ${t("toastText.sentancesStart")} ${name} ${t("toastText.sentancesAddingEnd")}!`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        )
    },
    'renameChannel': (t, name) => {
        return  (
            toast(`🦄 ${t("toastText.sentancesStart")} ${t("toastText.sentancesRenamingEnd")} ${name}!`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        )
    },
    'removeChannel': (t) => {
        return (
            toast(`😲 ${t("toastText.sentancesStart")} ${t("toastText.sentancesRemovingEnd")}!`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        )
    },
    "errorNetwork": (t) => {
        return (
            toast.error(`${t("toastText.errorNetwork")}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        )
    }
}

export default toastes;