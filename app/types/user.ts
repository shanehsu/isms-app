import {Token} from './token'

export interface User {
  id: string;
  email: string;
  name: string;
  title: string;
  group: number;
  unit: string;
  tokens: [Token];
}