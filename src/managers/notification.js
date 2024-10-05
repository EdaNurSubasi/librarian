import {urlBase64ToUint8Array} from "../utils/common"

class Manager {

    constructor() {
        this.dispatcher = null
    }

    request = ({
        permission: async () => {
            return await Notification.requestPermission()
        }
    })

    initiate = async (dispatcher) => {
        this.dispatcher = dispatcher
    }

    subscribe = async (key) => {
        try {
            const worker = await navigator.serviceWorker.ready
            let subscription = await worker.pushManager.getSubscription()
            if (!subscription) {
                subscription = await worker.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(key)
                })
            }

            return subscription

        } catch (error) {
            console.error(error)
        }
    }


    register = async () => {
        try {
            await navigator.serviceWorker.register("/worker.js", {scope: "/"})
            await navigator.serviceWorker.ready
            //await this.subscribe("")
        } catch (error) {
            console.error(error)
        }
    }

    unregister = async () => {
        const worker = await navigator.serviceWorker.ready
        await worker.unregister()
    }

}

export const NotificationManager = new Manager()
