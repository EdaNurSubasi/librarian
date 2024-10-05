import {Entity} from './base'
import {Book} from './book'

export class UserBooks extends Entity {
	constructor() {
		super()

		this.past = []
		this.present = []
	}

	encode() {
		return {
			id: this.id,
			past: this.past.map(b => b?.encode()),
			present: this.present.map(b => b?.encode()),
		}
	}

	decode(json) {
		if (!json) return
		super.decode(json)

		this.past = json.past?.map(j => {
			const book = new Book()
			book.decode(j)
			return book
		})

		this.present = json.present?.map(j => {
			const book = new Book()
			book.decode(j)
			return book
		})
	}
}
