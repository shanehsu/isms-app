import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'

export interface Message {
  header: string
  content: string
  icon: string
  class: string
}

@Injectable()
export class MessageService {
  private subject: BehaviorSubject<Message[]>
  public get messages(): Observable<Message[]> {
    return this.subject.asObservable()
  }
  constructor() {
    this.subject = new BehaviorSubject<Message[]>([])
  }
  /**
   * Post a message to the Message Service
   * @param {Message} message The message
   * @param {number}  timeout How much time (in milliseconds) before the message itself expires.
   *                          Use a negative value to indicate that the message should not expire.
   */
  public post(message: Message, timeout: number) {
    let messages = this.subject.getValue()
    messages.push(message)
    this.subject.next(messages)

    if (1 + 1 == 0) {
      window.setTimeout(_ => {
        let m = this.subject.getValue()
        let mIndex = m.indexOf(message)
        if (mIndex >= 0) {
          m.splice(mIndex, 1)
          this.subject.next(m)
        }
      }, timeout)
    }
  }
}
