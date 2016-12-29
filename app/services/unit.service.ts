import { Inject, Injectable } from '@angular/core'
import { Http, Headers, RequestOptionsArgs } from '@angular/http'

import { AuthService } from './auth.service'
import { User } from './../types/user'
import { Unit } from './../types/unit'

@Injectable()
export class UnitService {
  /**
   * Base URL of Units API
   */
  private endpoint: string;

  constructor(private authService: AuthService, private http: Http,
    @Inject("app.config") private config) {
    this.endpoint = config.endpoint + '/units'
  }

  /**
   * Returns a placeholder Unit that is empty.
   */
  get placeholder(): Unit {
    return new Unit({
      _id: '507c7f79bcf86cd7994f6c0e', name: '', identifier: 0, parentUnit: null, members: {
        none: [], agents: [], vendors: [], docsControl: null, manager: null
      }
    })
  }

  /**
   * Get all the units.
   */
  async units(): Promise<Unit[]> {
    let endpoint = this.endpoint
    let options: RequestOptionsArgs = {
      headers: new Headers({
        token: this.authService.token.getValue()
      })
    }

    return await this.http.get(endpoint, options)
      .map(res => res.json())
      .map(json => <any[]>json)
      .map(array => array.map($0 => new Unit($0)))
      .toPromise()
  }

  /**
   * Creates a unit.
   * @returns The id of the new unit.
   */
  async create(): Promise<string> {
    let endpoint = this.endpoint
    let options: RequestOptionsArgs = {
      headers: new Headers({
        token: this.authService.token.getValue()
      })
    }

    return await this.http.post(endpoint, null, options)
      .map(res => res.text())
      .toPromise()
  }

  /**
   * Updates a unit.
   */
  async update(unit: Unit): Promise<void> {
    let endpoint = `${this.endpoint}/${unit.id}`
    let options: RequestOptionsArgs = {
      headers: new Headers({
        token: this.authService.token.getValue(),
        "Content-Type": "application/json"
      })
    }
    let payload = Object.assign({}, unit)
    delete payload.id

    await this.http.put(endpoint, JSON.stringify(payload), options).toPromise()
  }

  /**
   * Deletes a unit.
   */
  async delete(id: string): Promise<void> {
    let endpoint = `${this.endpoint}/${id}`
    let options: RequestOptionsArgs = {
      headers: new Headers({
        token: this.authService.token.getValue(),
      })
    }

    await this.http.delete(endpoint, options).toPromise()
  }
}