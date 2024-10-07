import {Entity} from './base'

export class Book extends Entity {
	constructor() {
		super()

		this.name = ''
		this.score = -1.0
		this.userscore = -1
		this.publisheddate = new Date()
		this.writername = ''
		this.picture = ''
	}

	encode() {
		return {
			id: this.id,
			name: this.name,
			score: this.score,
			userscore: this.userscore,
			publisheddate: this.publisheddate,
			writername: this.writername,
			picture: this.picture,
		}
	}

	decode(json) {
		if (!json) return
		super.decode(json)
		this.name = json.name
		this.score = json?.score
		this.userscore = json?.userscore
		this.publisheddate = new Date(json.publisheddate)
		this.writername = json.writername
		this.picture = json.picture
	}
}
