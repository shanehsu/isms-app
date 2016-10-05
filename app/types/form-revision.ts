export interface FormRevision {
  _id: string
  revision: number
  signatures: boolean
  officerSignature: boolean
  group: number
  secrecyLevel: number
  template: string
  published: boolean
  
  // 回傳一群 id
  fields: [string]
}