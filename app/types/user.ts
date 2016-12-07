import { Group } from './group'
import { Token } from './token'

export class User {
  get id() { return this._id; }
  constructor(json: Object) {
    Object.assign(this, json)
    for (var i = 0; i < this.tokens.length; i ++) {
      this.tokens[i] = new Token(this.tokens[i]);
    }
  }
  
  _id: string
  email: string
  name: string
  group: Group
  unit?: {
    name: string,
    identifier: number,
    role: {
      agent: boolean,
      manager: boolean,
      docsControl: boolean
    }
  }
  tokens: Token[]
}