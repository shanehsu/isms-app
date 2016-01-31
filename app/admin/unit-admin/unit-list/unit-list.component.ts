// Angular 2
import {Component, OnInit} from 'angular2/core'
import {Router}            from 'angular2/router'

// Services
import {UnitService} from './../../../services/unit.service'
import {UserService} from './../../../services/user.service'

// Interfaces
import {Unit} from './../../../types/unit'

// Pipes
import {UnitNamePipe} from './../../../pipes/unit-name.pipe'
import {UserNamePipe} from './../../../pipes/user-name.pipe'

@Component({
  selector: 'unit-list',
  templateUrl: '/app/admin/unit-admin/unit-list/unit-list.template.html',
  providers: [UnitService, UserService],
  pipes: [UnitNamePipe, UserNamePipe]
})

export class UnitListComponent implements OnInit {
  private _units: Unit[];
  
  constructor(private _router: Router, private _unitService: UnitService) {
    this._units = [];
  }
  
  ngOnInit(): void {
    // 取得所有單位
    this._unitService.units()
        .then(units => this._units = units)
        .catch(console.error)
  }
  
  new(): void {
    this._unitService.new()
        .then(newUnitID => this._router.navigate(["UnitDetail", {id: newUnitID}]))
        .catch(console.error)
  }
  
  edit(unitID: string): void {
    this._router.navigate(["UnitDetail", {id: unitID}]);
  }
  
  delete(unitID: string): void {
    this._unitService.delete(unitID)
        .then(() => this._unitService.units()
                        .then(units => this._units = units)
                        .catch(console.error))
        .catch(console.error)
  }
}