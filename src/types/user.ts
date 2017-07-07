import { Group } from './group'
import { Token } from './token'

export class User {
  get id() { return this._id }
  constructor(json: Object) {
    Object.assign(this, json)

    // 當傳回列表時，沒有代幣資訊
    if (this.tokens) {
      this.tokens = this.tokens.map(token => new Token(token))
    }
  }

  _id: string
  email: string
  name: string
  group: Group
  confirmed: boolean
  tokens: Token[]

  /**
   * This property exists on the User returned from MeService
   */
  unit?: {
    name: string,
    identifier: number,
    role: {
      agent: boolean,
      manager: boolean,
      docsControl: boolean,
      vendor: boolean
    }
  }
}