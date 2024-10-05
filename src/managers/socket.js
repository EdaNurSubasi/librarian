import {io} from "socket.io-client"
import {UserType} from "../models"
import {SessionActions, ConsultantActions} from "../store/actions"

const config = {
    host: process.env.REACT_APP_API_URL,
    development: process.env.REACT_APP_DEVELOPMENT === "true"
}

class Manager {

    constructor() {
        this.socket = null
        this.dispatcher = null
        this.client = null

        this.subscriptions = {} // string, Model
    }

    connect = (client, token, dispatcher) => {
        if(!client || !token) return

        this.client = client
        this.dispatcher = dispatcher

        this.socket = io(`${config.host}`, {
            reconnection: true,
            transports: ['websocket'],
            query: `token=${token}&id=${client.id}`
        })

        this.socket.on('connect', () => {
            console.debug("[SOCKET] Connection is successful.")
            this.subscribe.client(client)
        })

        this.socket.on('connect_error', (error) => {
            console.debug("[SOCKET] Connection could not be successful due to", error)
        })

        this.socket.on('disconnect', (reason) => {
            console.log("[SOCKET] Disconnected from the server", reason)
        })
    }

    subscribe = {
        session: (session) => {
            console.debug("[SOCKET] Joining to the session space", session.id)
            this.socket.emit('join', session.id)
        }
    }

    unsubscribe = {
        session: (session) => {
            console.debug("[SOCKET] Leaving from the session space", session.id)
            this.socket.emit('leave', session.id)
            delete this.subscriptions.rtc
        }
    }

    leave = () => {
        if (!this.socket) return;

        this.socket.removeListener()

        for(let subscription in this.subscriptions){
            this.socket.emit('leave', this.subscriptions[subscription].id)
        }

        this.subscriptions = {}
    }

    //TODO: Implement accordingly
    //Events
    // onDidReceiveEvent = (packet) => {
    //     console.debug("[SOCKET] And event did receive.", packet)
    //     this.dispatcher(StoreActions.event.incoming(packet))
    // }
}

export const SocketManager = new Manager()
