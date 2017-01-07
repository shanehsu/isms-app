import { Group } from './group'
import { Field } from './field'

export class FormRevision {
  constructor(json: any) {

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