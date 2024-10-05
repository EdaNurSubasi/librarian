import {Entity} from "./base"

export const Roles = Object.freeze({
    admin: 'admin',
    standard: 'standard'
})

export const Types = Object.freeze({
    standard: 'standard'
})

export const Scopes = Object.freeze({
    system: 'system',
    domain: 'domain'
})

export class User extends Entity {
    constructor() {
        super()

        this.name = ""

        this.scope = Scopes.domain
        this.type = Types.standard
        this.role = Roles.standard

        this.detail = null
    }

    encode(){
        return {
            id: this.id,
            name: this.name,
            scope: this.name,
            type: this.type,
            role: this.role,
        }
    }

    decode(json) {
        if (!json) return
        super.decode(json)

        this.name = json.name

        this.scope = json.name
        this.type = json.type
        this.role = json.role

        switch (this.type) {
            case Types.standard:
                break
            case Types.consultant:
                break
            default:
                break
        }
    }
}
