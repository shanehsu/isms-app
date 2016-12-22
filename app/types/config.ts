import { NavigationItem } from './navigation-item'

export interface Config {
  endpoint: string
  ssoUrl: string
  navigationItems: NavigationItem[]
  adminItems: NavigationItem[]
}