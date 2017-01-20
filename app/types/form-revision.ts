import { Group } from './group'
import { Field } from './field'

export class FormRevision {
  constructor(json: any) {
    Object.assign(this, json)
    this.fields = json.fields.map(field => new Field(field))
  }

  get id() {
    return this._id
  }

  _id: string
  number: number
  signatures: boolean
  skipImmediateChief: boolean
  published: boolean
  groups: Group[]
  secrecy: number
  template: string
  fields: Field[]
}
