export interface FormRevision {
  _id: string
  revision: number
  signatures: number
  group: number
  secrecyLevel: number
  template: string
  
  // 回傳一群 id
  fields: [string]
}