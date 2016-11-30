import { Group } from './group'
import { Token } from './token'

export interface User {
  id: string;
  email: string;
  name: string;
  group: Group;
  unit: any;
  tokens: Token[];
}