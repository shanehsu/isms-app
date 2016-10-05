export interface Field {
  _id: string
  name: string
  type: 'shortText' | 'longText' | 'date' | 'time' | 'options' | 'table'
  hint: string
  metadata: any
}