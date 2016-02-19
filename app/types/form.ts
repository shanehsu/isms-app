export interface Form {
  _id: string
  identifier: string
  name: string
  
  // 回傳一群 id
  revisions: [string]
}