import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

export interface DebugItem {
  source: string
  section?: string
  name: string
  subject: BehaviorSubject<any>
  subscription?: Subscription
}

export interface DebugView {
  source: string
  section?: string
  name: string
  value: any
}

@Injectable()
export class DebugService {
  private subjects: DebugItem[]
  private _debuggables: BehaviorSubject<DebugView[]>
  public debuggables: Observable<DebugView[]>

  constructor() {
    this.subjects = []
    this._debuggables = new BehaviorSubject<DebugView[]>([])
    this.debuggables = this._debuggables.asObservable()
  }
  public register(item: DebugItem) {
    this.subjects.push(item)
    this.subjects[this.subjects.length - 1].subscription = item.subject.subscribe(_ => this.pushNewValues())
    this.pushNewValues()
  }
  public revoke(item: DebugItem) {
    let index = this.subjects.findIndex($0 => {
      return item.source == $0.source && item.section == $0.section && item.name == $0.name
    })
    if (index >= 0) {
      this.subjects[index].subscription.unsubscribe()
      this.subjects.splice(index, 1)
    }
    this.pushNewValues()
  }
  private pushNewValues() {
    this._debuggables.next(this.subjects.map($0 => {
      return {
        source: $0.source,
        section: $0.section,
        name: $0.name,
        value: $0.subject.value
      }
    }))
  }
}
