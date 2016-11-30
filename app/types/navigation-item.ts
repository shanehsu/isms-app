import { Group } from './group'

export interface NavigationItem {
  name: string;
  path: string;
  group: Group[];
}