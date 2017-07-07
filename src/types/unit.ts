export class Unit {
  constructor(object: any) {
    Object.assign(this, object)
    this.members = new UnitMember(object.members)
  }
  get id(): string {
    return this._id
  }
  _id: string
  name: string
  identifier: number
  parentUnit?: string

  members: UnitMember
}

class UnitMember {
  constructor(object: any) {
    Object.assign(this, object)
  }
  get all(): string[] {
    let all = [...this.none, ...this.agents, ...this.vendors]
    if (this.docsControl) {
      all.push(this.docsControl)
    }
    if (this.manager) {
      all.push(this.manager)
    }

    return all
  }

  none: string[]
  agents: string[]
  vendors: string[]
  docsControl?: string
  manager?: string
}
