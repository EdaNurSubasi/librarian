import {Entity} from './base'
import {UserBooks} from '.'
export class User extends Entity {
	constructor() {
		super()

		this.name = ''
		this.address = ''
		this.birthdate = new Date()
		this.picture = ''
		this.books = null
	}

	encode() {
		return {
			id: this.id,
			name: this.name,
			address: this.address,
			birthdate: this.birthdate,
			picture: this.picture,
			books: this.books?.encode(),
		}
	}

	decode(json) {
		if (!json) return
		super.decode(json)
		this.id = json.id
		this.name = json.name
		this.address = json.address
		this.birthdate = json.birthdate
		this.picture = json.picture
		this.books = new UserBooks()
		this.books.decode(json.books)
	}
}
