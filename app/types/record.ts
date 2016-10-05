export interface Signature {
  id: string
  personnel: string
  signed: boolean
  timestamp: Date
}
export interface Record {
  id: string
  created: Date
  data: any
  formID: string
  formRevision: string
  owner: string
  owningUnit: string
  serial: number
  signatures: Signature[]
} 
export interface PopulatedRecord {
  id: string
  created: Date
  form: {
    id: string,
    name: string
  }
  revision: {
    id: string,
    version: number
  }
  owner: {
    id: string,
    name: string
  }
  owningUnit: {
    id: string,
    identifier: string,
    name: string
  }
  serial: number
  signatures: Signature[]
}
export interface SinglePopulatedRecord {
  id: string
  created: Date
  form: {
    id: string,
    name: string
  }
  revision: {
    id: string,
    version: number
  }
  owner: {
    id: string,
    name: string
  }
  owningUnit: {
    id: string,
    identifier: string,
    name: string
  }
  serial: number
  data: any
  signatures: {
    personnel: {
      id: string,
      name: string
    },
    signed: boolean,
    timestamp: Date,
    unit: string,
    role: string
  }[]
}
