import {Entity} from "./base"
import {User} from "./user"

export class Session extends Entity {
    constructor() {
        super()
        this.user = null
        this.token = null
    }

    encode(){
        return {
            id: this.id,
            user: this.user?.encode(),
            token: this.token
        }
    }

    decode(json) {
        if (!json) return
        super.decode(json)

        this.user = new User()
        this.user.decode(json.user)

        this.token = json.token
    }
}
