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
   */
  public post(message: Message) {
    let messages = this.subject.getValue()
    messages.push(message)
    this.subject.next(messages)
  }
  public error(header: string, message: string) {
    let messages = this.subject.getValue()
    messages.push({
      header: header,
      content: message,
      icon: 'remove',
      class: 'error'
    })
    this.subject.next(messages)
  }
}
