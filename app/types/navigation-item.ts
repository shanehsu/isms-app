import { Group } from './group'

export type Role = 'agent' | 'manager' | 'docsControl' | 'vendor'

export interface NavigationItem {
  name: string
  path: string
  group: Group[]
  roles?: Role[]
}