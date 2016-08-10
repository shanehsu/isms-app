import {Pipe, PipeTransform} from '@angular/core';
import {Unit}                from './../types/unit'
import {UnitService}         from './../services/unit.service'
@Pipe({name: 'unitName', pure: false})

export class UnitNamePipe implements PipeTransform {
  private _units: {[id : string] : string } = {};
  
  constructor(unitService: UnitService) {
    unitService.units().then(units => {
      for (let unit of units) {
        this._units[unit.id] = unit.name
      }
    })
  }
  
  transform(id: string, args: string[]): string {
    if (!id || id == '') {
      if (!args || args.indexOf('silent') < 0) {
        return '未隸屬任何單位'
      } else {
        return ''
      }
    } else if (this._units[id]) {
      return this._units[id]
    } else {
      return 'ID 屬於不存在的單位'
    }
  }
}