export class Piece {
  _id: string
  date: Date
  summary: string
  source: string
  link: string
  
  constructor(json: Object) {
    Object.assign(this, json)
  }
  
  get id(): string {
    return this._id
  }
}
