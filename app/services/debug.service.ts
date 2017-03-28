import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'

export interface DebugItem {
  context: string
  section?: string
  name: string
  value: Observable<any>
}

export interface DebugViewItem {
  context: string
  section?: string
  name: string
  value: any
}

@Injectable()
export class DebugService {
  private subject: BehaviorSubject<DebugItem[]>

  public get items(): Observable<DebugViewItem[]> {
    return new BehaviorSubject()
  }
  constructor() {
    this.subject = new BehaviorSubject<DebugItem[]>([])
  }

  public register(item: DebugItem) {
    let values = this.subject.getValue()
    values.push(item)
    this.subject.next(values)
  }
  public takeBack(item: DebugItem) {
    let values = this.subject.getValue()
    let index = values.findIndex(e => e.context === item.context && e.section === item.section && e.name === item.name)
    if (index >= 0) { values.splice(index, 1) }

    this.subject.next(values)
  }
}
