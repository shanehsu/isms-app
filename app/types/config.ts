import {NavigationItem} from './navigation-item'

export interface Config {
  endpoint: string;
  navigationItems: [NavigationItem];
  adminItems: [NavigationItem]
}