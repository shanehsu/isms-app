import { Directive, HostBinding, OnInit, AfterViewInit } from '@angular/core'

@Directive({
  selector: 'step'
})
export class StepDirective {
  @HostBinding('style.display') private display: string
  public get active() {
    return this.display == 'initial' || this.display === undefined
  }
  public set active(newValue: boolean) {
    this.display = newValue ? 'initial' : 'none'
  }
}
