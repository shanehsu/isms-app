// Angular 2
import {Component, OnInit}   from 'angular2/core'
import {NgForm}              from 'angular2/common';
import {Router, RouteParams} from 'angular2/router'

// Services
import {UnitService} from './../../../services/unit.service'
import {UserService} from './../../../services/user.service'

// Interfaces
import {Unit, User} from './../../../types/types'

// Pipes
import {UnitNamePipe, UserNamePipe} from './../../../pipes/pipes'

@Component({
  selector: 'unit-detail',
  templateUrl: '/app/admin/unit-admin/unit-detail/unit-detail.template.html',
  providers: [UnitService, UserService],
  pipes: [UnitNamePipe, UserNamePipe]
})

export class UnitDetailComponent implements OnInit {
  private _unitID: string
  private _unit: Unit
  
  constructor(private _router: Router, private _routeParams: RouteParams, private _unitService: UnitService) {}
  
  ngOnInit(): void {
    // Get a placeholder Unit to get around the undefined key bug.
    this._unit   = this._unitService.empty()
    this._unitID = this._routeParams.get('id')
    
    // Get the Unit from UnitService
    this._unitService.unit(this._unitID)
        .then(unit => this._unit = unit)
        .catch(console.error)
  }
  
  submit_name_and_identifier() {
    // console.log(this._unit)
    
    this._unitService.update(this._unit)
        .then(() => this._router.navigate(['UnitList']))
        .catch(console.error)
  }
  
  cancel() {
    this._router.navigate(['UnitList']);
  }
}