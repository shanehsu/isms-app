export class Token {
  constructor(json: Object) {
    Object.assign(this, json)
  }
  
  _id: string
  origin: string
  token: string
  userAgent: string
  used: Date

  get id(): string {
    return this._id
  }
}