import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'groupName'})

export class GroupNamePipe implements PipeTransform {
  transform(value: number) : string {
    switch(value) {
      case 1:
        return '管理員'
      case 2:
        return '資訊安全人員'
      case 3:
        return '一般使用者'
      default:
        return '未知'
    }
  }
}