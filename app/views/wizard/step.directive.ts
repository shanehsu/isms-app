import { Directive, HostBinding, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Directive({
  selector: 'step'
})
export class StepDirective implements OnInit {
  @Input('canPrevious') public canPrevious: boolean
  @Input('canNext') public canNext: boolean
  @Input('name') public name: string
  @Input('description') public description: string
  @Output('active') private onActive: EventEmitter<void> = new EventEmitter<void>()

  @HostBinding('style.display') private display: string
  public get active() {
    return this.display == 'initial' || this.display === undefined
  }
  public set active(newValue: boolean) {
    if (newValue == true) {
      this.onActive.emit()
    }
    this.display = newValue ? 'initial' : 'none'
  }

  public ngOnInit(): void { }
}
