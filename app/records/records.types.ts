import { Field } from './../types/types'

// 各種欄位資料的定義
// 從基本型態開始
// TextFieldData | TimeFieldData | DateFieldData | OptionFieldData | TableFieldData
export type TextFieldData = string
export type TimeFieldData = { hour: number, minute: number }
export type DateFieldData = Date
export type OptionFieldData = { selected: boolean[], values: FieldData[][]}
// We used any[] in TableFieldData since a type alias cannot reference itself
export type TableFieldData = (TextFieldData | TimeFieldData | DateFieldData | OptionFieldData | any[])[][]

export type FieldData = TextFieldData | TimeFieldData | DateFieldData | OptionFieldData | TableFieldData

export type Schema = Field[]

// This will handle text, time, and date. These will be stored using string.
export type GenericFieldDisplayData = string

export interface OptionFieldDisplayData {
  selectedValues: string[]
  nestedValues: FieldDisplayMetadata[][]
}
export interface TableFieldDisplayData {
  titles: string[]
  values: FieldDisplayData[][]
}

export type FieldDisplayData = GenericFieldDisplayData | OptionFieldDisplayData | TableFieldDisplayData

export interface FieldDisplayMetadata {
  title: string
  value: FieldDisplayData
}