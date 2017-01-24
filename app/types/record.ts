export class Signature {
  personnel: string
  timestamp: Date
  signed: boolean
}

export class Record {
  constructor(json: any) {
    Object.assign(this, json)
    this.created = new Date(this.created)
  }

  get id() { return this._id; }
  _id?: string
  formID: string
  formRevision: string
  owningUnit: string
  created: Date
  serial: number
  generatedSerial: string
  owner: string
  status: "awaiting_review" | "accepted" | "declined"
  signatures: Signature[]
  contents?: any
}
