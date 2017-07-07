export class Field {
  constructor(json: any) {
    Object.assign(this, json)
  }

  get id() {
    return this._id
  }

  _id: string
  name: string
  type: 'shortText' | 'longText' | 'date' | 'time' | 'options' | 'table'
  hint: string
  metadata: any
}