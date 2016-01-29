import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'unitName', pure: false})

export class UnitNamePipe implements PipeTransform {
  transform(value: string) : string {
    console.warn('要記得實作 UnitNamePipe 的功能。');
    if (!value || value == '') {
      return '無資料'
    } else {
      return '未實作'
    }
  }
}