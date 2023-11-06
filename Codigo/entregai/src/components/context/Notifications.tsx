import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "./UserContext"
import { toast } from "react-toastify"
import toastConfig from "@/libs/toast/toastConfig"

const Notifications = () => {

    const [ notifications, setNotifications ] = useState<any>(null)

    const { user } = useAuth()

    let audio = new Audio("/sounds/notification.mp3")

    const start = () => {
        audio.play()
    }

    useEffect(() => {

        const fetchNotifications = async (uid: string) => {
                
            const res = await axios.get(`/api/user/notifications?uid=${uid}`)

            const notificationsData = res.data.notifications

            if (notifications !== null) {

                if (notificationsData.length !== notifications.length) {

                    toast.info("Você tem um novo pedido no supermercado " + notificationsData[notificationsData.length - 1].supermarketName + "!", toastConfig)

                    start()

                    setNotifications(notificationsData)

                }

            } else {

                setNotifications(notificationsData)
            }
        }

        if (user.id !== undefined && user.id !== null && user.id !== "") {

            const interval = setInterval(() => {
                fetchNotifications(user.id)
            }, 1000)

            return () => clearInterval(interval)
            
        }
        
    }, [ user.id, notifications ])

    return (
        <></>
    )
}

export default Notifications