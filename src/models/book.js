import {Entity} from './base'

export class Book extends Entity {
	constructor() {
		super()

		this.name = ''
		this.score = -1.0
	}

	encode() {
		return {
			id: this.id,
			name: this.name,
			books: this.score,
		}
	}

	decode(json) {
		if (!json) return
		super.decode(json)
		this.name = json.name
		this.score = json.score
	}
}
