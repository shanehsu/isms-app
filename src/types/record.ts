export class Signature {
  constructor(json: any) {
    Object.assign(this, json)
    this.timestamp = new Date(this.timestamp)
  }
  _id: string
  personnel: string
  timestamp: Date
  signed: boolean

  // 只有在 /records
  name: string
}

export class Record {
  constructor(json: any) {
    Object.assign(this, json)
    this.created = new Date(this.created)
    this.signatures = this.signatures.map(signature => new Signature(signature))
  }

  get id() { return this._id; }
  _id?: string
  formId: string
  formRevision: string
  owningUnit: string
  created: Date
  serial: number
  generatedSerial: string
  owner: string
  status: "awaiting_review" | "accepted" | "declined"
  signatures: Signature[]
  contents?: any

  // 只有在 /records
  formName?: string
  ownerName?: string
  unitName?: string
  revisionNumber?: number
}
