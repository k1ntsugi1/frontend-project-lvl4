
import { toast } from 'react-toastify';

const toastes = {
    'newChannel': (t, name) => {
        return (
            toast(`⭐ ${t("toastText.sentancesStart")} ${name} ${t("toastText.sentancesAddingEnd")}!`, {
                position: "top-right",
                autoClose: 3000,
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
                position: "top-right",
                autoClose: 3000,
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
                position: "top-right",
                autoClose: 3000,
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
            toast.error(`🦄 ${t("toastText.errorNetwork")}`, {
                position: "top-right",
                autoClose: 5000,
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