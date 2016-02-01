import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'chineseDate'})

export class ChineseDatePipe implements PipeTransform {
  transform(value: Date): string {
    let year  = value.getFullYear();
    let month = value.getMonth() + 1;
    let date  = value.getDate();
    
    return year + ' 年 ' + month + ' 月 ' + date + ' 日';
  }
}