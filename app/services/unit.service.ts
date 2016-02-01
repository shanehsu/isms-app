import {Inject, Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'
import {AuthService}   from './auth.service'

import {User}  from './../types/user'
import {Unit}  from './../types/unit'

@Injectable()

/**
 * This service provide a total of 13 methods to communicate with
 * the Unit API provided by isms-api.
 * 
 * They include Unit Management, User Listing (User in Unit, User without Unit),
 * Inter-Unit Relation, User-Unit Relation, User Role Management
 * 
 * The API are built very carefully and thoughtfully. For example, in order to
 * transfer an User X from Unit A to Unit B, the end user should do the following,
 * 
 * - Make sure User X has no active role in Unit A (otherwise remove its role(s))
 * - Remove User X from Unit A
 * - Add User X to Unit B
 * 
 * In the API, this is expressed as,
 * 
 * - /units/deassignRole <json> {unit, user, role}
 * - /units/removeUser   <json> {unit, user}
 * - /units/relateUser   <json> {unit, user}
 * 
 * May need multiple deassignRole to deassign all roles.
 * 
 * This API design makes sure that no mistakes and assumptions are made, the admin
 * will not by accident remove a user with an important role from its unit. The
 * design also makes writing the backend and frontend super simple.
 * 
 */
export class UnitService {
  
  /**
   * Base URL of Units API
   */
  private _baseURL: string;
  
  constructor(private _authService: AuthService,
              private _http: Http,
              @Inject("app.config") private _config) {
    
    this._baseURL = _config.endpoint + '/units'
  }
  
  /**
   * Returns a placeholder Unit that is empty.
   */
  empty(): Unit {
    return {
      id: '',
      name: '',
      identifier: 0,
      parentUnit: '',
      childUnits: [],
      manager: '',
      docsControl: '',
      agents: []
    }
  }
  
  /**
   * Intended from private use only, maps a returned JSON object to Unit object.
   */
  __util__map__(object: any): Unit {
    return {
      id: object._id,
      name: object.name,
      identifier: object.identifier,
      parentUnit: object.parentUnit,
      childUnits: object.childUnits,
      manager: object.manager,
      docsControl: object.docsControl,
      agents: object.agents
    }
  }
  
  /**
   * Lists all units.
   * 
   * Returns a Promise of an array of Unit.
   */
  units(): Promise<Unit[]>{
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL
    
    return new Promise<Unit[]>((resolve, reject) => {
      this._http.get(URL, options)
          .map(res => res.json())
          .subscribe(units => {
            let anyArray = <any[]>units
            let unitArray = anyArray.map(this.__util__map__)
            resolve(unitArray)
          }, reject)
    })
  }
  
  /**
   * Get a Unit.
   * 
   * Returns a Promise of a Unit.
   */
  unit(id: string): Promise<Unit> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/' + id
    
    return new Promise<Unit>((resolve, reject) => {
      this._http.get(URL, options)
          .map(res => res.json())
          .subscribe(units => {
            let anyObject = <any>units
            let unitObject = this.__util__map__(anyObject)
            resolve(unitObject)
          }, reject)
    })
  }
  
  /**
   * Creates a Unit.
   * 
   * Returns a Promise of a string, id of the newly created Unit.
   */
  new(): Promise<string> {
    let headers = new Headers({
      token: this._authService.retrieve_token(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers,
    }
    let URL = this._baseURL
    let payloadObject = {
      name: '',
      identifier: 0
    }
    let payload = JSON.stringify(payloadObject)
    
    return new Promise<string>((resolve, reject) => {
      this._http.post(URL, payload, options)
          .map(res => res.text())
          .subscribe(resolve, reject)
    })
  }
  
  /**
   * Updates a Unit.
   * 
   * Only the name, and identifier information can be updated through this method.
   * 
   * Returns a Promise.
   */
  update(unit: Unit) : Promise<void> {
    let headers = new Headers({
      token: this._authService.retrieve_token(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/' + unit.id
    let payloadObject = {
      name: unit.name,
      // identifier should really be an integer in parsing,
      // but the backend mongoose really handle the verification.
      identifier: unit.identifier
    }
    let payload = JSON.stringify(payloadObject)
    
    return new Promise<void>((resolve, reject) => {
      this._http.put(URL, payload, options)
          .subscribe(resolve, reject)
    })
  }
  
  /**
   * Deletes a Unit.
   * 
   * Returns a Promise.
   */
  delete(id: string): Promise<void> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/' + id
    
    return new Promise<void>((resolve, reject) => {
      this._http.delete(URL, options)
          .subscribe(resolve, reject)
    })
  }
  
  freeUsers(): Promise<string[]> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/freeUsers'
    
    return new Promise<string[]>((resolve, reject) => {
      this._http.get(URL, options)
          .map(res => res.json())
          .subscribe(resolve, reject)
    })
  }
  
  usersInUnit(id: string): Promise<string[]> {
    let headers = new Headers({
      token: this._authService.retrieve_token()
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/usersInUnit/' + id
    
    return new Promise<string[]>((resolve, reject) => {
      this._http.get(URL, options)
          .map(res => res.json())
          .subscribe(resolve, reject)
    })
  }
  
  relateUser(unitID: string, userID: string): Promise<void> {
    let headers = new Headers({
      token: this._authService.retrieve_token(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/relateUser/'
    let payloadObject = {
      user: userID,
      unit: unitID
    }
    let payloadString = JSON.stringify(payloadObject)
    
    return new Promise<void>((resolve, reject) => {
      this._http.put(URL, payloadString, options)
          .subscribe(resolve, reject)
    })
  }
  
  removeUser(unitID: string, userID: string): Promise<void> {
    let headers = new Headers({
      token: this._authService.retrieve_token(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/removeUser/'
    let payloadObject = {
      user: userID,
      unit: unitID
    }
    let payloadString = JSON.stringify(payloadObject)
    
    return new Promise<void>((resolve, reject) => {
      this._http.put(URL, payloadString, options)
          .subscribe(resolve, reject)
    })
  }
  
  assignRole(unitID: string, userID: string, role: string) {
    let headers = new Headers({
      token: this._authService.retrieve_token(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/assignRole/'
    let payloadObject = {
      user: userID,
      unit: unitID,
      role: role
    }
    let payloadString = JSON.stringify(payloadObject)
    
    return new Promise<void>((resolve, reject) => {
      this._http.put(URL, payloadString, options)
          .subscribe(resolve, reject)
    })
  }
  
  deassignRole(unitID: string, userID: string, role: string) {
    let headers = new Headers({
      token: this._authService.retrieve_token(),
      'Content-Type': 'application/json'
    })
    let options = {
      headers: headers
    }
    let URL = this._baseURL + '/deassignRole/'
    let payloadObject = {
      user: userID,
      unit: unitID,
      role: role
    }
    let payloadString = JSON.stringify(payloadObject)
    
    return new Promise<void>((resolve, reject) => {
      this._http.put(URL, payloadString, options)
          .subscribe(resolve, reject)
    })
  }
}