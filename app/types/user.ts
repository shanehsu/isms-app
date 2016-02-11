import {Token} from './token'

export interface User {
  id: string;
  email: string;
  name: string;
  group: number;
  unit: string;
  tokens: Token[];
}