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
  
  private _unitUserIDs: string[]
  private _freeUserIDs: string[]
  
  private _freeUnitIDs: string[]
  
  constructor(private _router: Router, private _routeParams: RouteParams, private _unitService: UnitService) {}
  
  ngOnInit(): void {
    // Get a placeholder Unit to get around the undefined key bug.
    this._unit   = this._unitService.empty()
    this._unitUserIDs = []
    this._freeUserIDs = []
    this._freeUnitIDs = []
    this._unitID = this._routeParams.get('id')
    
    // Get the Unit from UnitService
    this._unitService.unit(this._unitID)
        .then(unit => this._unit = unit)
        .catch(console.error)
    
    this._unitService.usersInUnit(this._unitID)
        .then(userIDs => this._unitUserIDs = userIDs)
        .catch(console.error)
    
    this._unitService.freeUsers()
        .then(userIDs => this._freeUserIDs = userIDs)
        .catch(console.error)
    
    this._unitService.freeUnits(this._unitID)
        .then(unitIDs => this._freeUnitIDs = unitIDs)
        .catch(console.error)
  }
  
  submit_name_and_identifier() {
    this._unitService.update(this._unit)
        .then(() => this._router.navigate(['UnitList']))
        .catch(console.error)
  }
  
  relateUser(unitID: string, userID: string) {
    this._unitService.relateUser(unitID, userID)
        .then(() => {
          this._unitService.usersInUnit(this._unitID)
              .then(userIDs => this._unitUserIDs = userIDs)
              .catch(console.error)
    
          this._unitService.freeUsers()
              .then(userIDs => this._freeUserIDs = userIDs)
              .catch(console.error)
        })
        .catch(console.error)
  }
  
  removeUser(unitID: string, userID: string) {
    this._unitService.removeUser(unitID, userID)
        .then(() => {
          this._unitService.usersInUnit(this._unitID)
              .then(userIDs => this._unitUserIDs = userIDs)
              .catch(console.error)
    
          this._unitService.freeUsers()
              .then(userIDs => this._freeUserIDs = userIDs)
              .catch(console.error)
        })
        .catch(console.error)
  }
  
  assignRole(unitID: string, userID: string, role: string) {
    this._unitService.assignRole(unitID, userID, role)
        .then(() => {
          this._unitService.unit(this._unitID)
              .then(unit => this._unit = unit)
              .catch(console.error)
          
          this._unitService.usersInUnit(this._unitID)
              .then(userIDs => this._unitUserIDs = userIDs)
              .catch(console.error)
        })
        .catch(console.error)
  }
  
  deassignRole(unitID: string, userID: string, role: string) {
    this._unitService.deassignRole(unitID, userID, role)
        .then(() => {
          this._unitService.unit(this._unitID)
              .then(unit => this._unit = unit)
              .catch(console.error)
          
          this._unitService.usersInUnit(this._unitID)
              .then(userIDs => this._unitUserIDs = userIDs)
              .catch(console.error)
        })
        .catch(console.error)
  }
  
  relateParent(parentUnit: string, childUnit: string) {
    this._unitService.relateParent(parentUnit, childUnit)
        .then(() => {
          this._unitService.unit(this._unitID)
              .then(unit => this._unit = unit)
              .catch(console.error)
        }).catch(console.error)
  }
  
  removeParent(parentUnit: string, childUnit: string) {
    this._unitService.removeParent(parentUnit, childUnit)
        .then(() => {
          this._unitService.unit(this._unitID)
              .then(unit => this._unit = unit)
              .catch(console.error)
          this._unitService.freeUnits(this._unitID)
              .then(unitIDs => this._freeUnitIDs = unitIDs)
              .catch(console.error)
        }).catch(console.error)
  }
  
  cancel() {
    this._router.navigate(['UnitList']);
  }
}