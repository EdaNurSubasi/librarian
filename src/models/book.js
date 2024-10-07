import {Entity} from './base'

export class Book extends Entity {
	constructor() {
		super()

		this.name = ''
		this.score = -1.0
		this.publisheddate = new Date()
		this.writername = ''
		this.picture = ''
	}

	encode() {
		return {
			id: this.id,
			name: this.name,
			score: this.score,
			publisheddate: this.publisheddate,
			writername: this.writername,
			picture: this.picture,
		}
	}

	decode(json) {
		if (!json) return
		super.decode(json)
		this.name = json.name
		this.score = json.score
		this.publisheddate = json.publisheddate
		this.writername = json.writername
		this.picture = json.picture
	}
}
