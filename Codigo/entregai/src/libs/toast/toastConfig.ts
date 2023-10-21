import { ToastOptions } from "react-toastify"

const toastConfig: ToastOptions<{}> = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

export default toastConfig