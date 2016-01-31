export interface Unit {
  id: string,
  name: string,
  identifier: number, // 學校的行政單位編號
  parentUnit: string,   // 兩者的關係必須自己維護
  childUnits: string[], // 兩者的關係必須自己維護
  manager: string,      // 主管
  docsControl: string,  // 文管
  agents: string[]
}