import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'chineseDate' })

export class ChineseDatePipe implements PipeTransform {
  transform(value: Date, args: string[]): string {
    if (!value) {
      return '錯誤'
    }
    
    if (args && args.indexOf("builtin") >= 0) {
      let formatter = Intl.DateTimeFormat("zh-Hant-TW", { year: 'numeric', month: 'long', day: 'numeric' })
      return formatter.format(value)
    }

    let year = value.getFullYear();
    let month = value.getMonth() + 1;
    let date = value.getDate();

    return year + ' 年 ' + month + ' 月 ' + date + ' 日';
  }
}