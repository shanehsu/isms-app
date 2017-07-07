import { Pipe, PipeTransform } from '@angular/core';
import { Group } from './../types/group'

@Pipe({ name: 'groupName' })
export class GroupNamePipe implements PipeTransform {
  transform(value: Group): string {
    switch (value) {
      case 'guests':
        return '管理員'
      case 'vendors':
        return '廠商'
      case 'users':
        return '一般使用者'
      case "securityPersonnel":
        return '資訊安全人員'
      case "admins":
        return "管理員"
    }
  }
}