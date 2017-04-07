import { Component, AfterContentInit, ContentChildren, QueryList, Input, Output, EventEmitter } from '@angular/core'

import { StepDirective } from './step.directive'

@Component({
  selector: 'wizard',
  template: `
  <div *ngIf="!finished">
    <ng-content select="step"></ng-content>
    <div>
      <button *ngIf="__currentStep !== 1"             class="ui button" [disabled]="!canPrevious" (click)="prev()">上一步</button>
      <button *ngIf="__currentStep !== totalStep - 1" class="ui right floated button" [disabled]="!canNext" (click)="next()">下一步</button>
      <button *ngIf="__currentStep === totalStep - 1" class="ui right floated green button" [disabled]="!canNext" (click)="finish()">完成</button>
    </div>
  </div>
  <div *ngIf="finished">
    精靈完成
  </div>
  `
})
export class WizardComponent implements AfterContentInit {
  @Input('canPrevious') private canPrevious: boolean = false
  @Input('canNext') private canNext: boolean = false
  @Output('stepChanged') private onStepChanged: EventEmitter<number> = new EventEmitter<number>()
  @Output('finished') private onFinished: EventEmitter<void> = new EventEmitter<void>()

  // 步驟總數、步驟元件
  @ContentChildren(StepDirective) private steps: QueryList<StepDirective>
  private totalStep: number = -1

  // 步驟
  private __currentStep: number = 0
  private get currentStep() { return this.__currentStep }
  private set currentStep(newValue: number) {
    this.__currentStep = newValue
    this.onStepChanged.emit(newValue)
  }

  // 精靈完成
  private __finished: boolean = false
  private get finished() { return this.__finished }
  private set finished(newValue: boolean) {
    this.__finished = newValue
    this.onFinished.emit()
  }

  public ngAfterContentInit() {
    this.steps.filter((_, index) => index != 0).forEach($0 => $0.active = false)
    this.totalStep = this.steps.length
  }

  private prev() {
    this.steps.toArray()[this.currentStep].active = false
    this.currentStep--
    this.steps.toArray()[this.currentStep].active = true
  }
  private next() {
    this.steps.toArray()[this.currentStep].active = false
    this.currentStep++
    this.steps.toArray()[this.currentStep].active = true
  }
  private finish() {
    this.finished = true
  }
}
