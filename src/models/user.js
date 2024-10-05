import {Entity} from './base'
import {UserBooks} from '.'
export class User extends Entity {
	constructor() {
		super()

		this.name = ''
		this.books = null
	}

	encode() {
		return {
			id: this.id,
			name: this.name,
			books: this.books?.encode(),
		}
	}

	decode(json) {
		if (!json) return
		super.decode(json)
		this.name = json.name
		this.books = new UserBooks()
		this.books.decode()
	}
}
