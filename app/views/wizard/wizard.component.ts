import { Component, AfterContentInit, ContentChildren, QueryList, Input, Output, EventEmitter } from '@angular/core'

import { StepDirective } from './step.directive'

@Component({
  selector: 'wizard',
  template: `
  <div style="margin-bottom: 1em; display: flex;">
    <div class="ui vertical ordered steps" style="margin-bottom: 0; margin-right: 1em;">
      <div class="step" [class.described]="hasDescription" *ngFor="let step of steps; let i = index" [class.active]="!finished && __currentStep == i" [class.completed]="finished || __currentStep > i">
        <div class="content">
          <div class="title">{{step.name}}</div>
          <div *ngIf="step.description" class="description">{{step.description}}</div>
        </div>
      </div>
    </div>
    <div style="flex: 1;">
      <div class="ui segment" style="display: inline-block; height: 100%; width: 100%; flex: 1;">
        <ng-container *ngIf="!finished; else done">
          <ng-content select="step"></ng-content>
        </ng-container>
        <ng-template #done>
          <ng-content select="done"></ng-content>
        </ng-template>
      </div>
    </div>
  </div>
  <div class="ui fluid buttons" *ngIf="!finished">
    <button *ngIf="__currentStep !== 0"             class="ui teal button" [disabled]="!steps.toArray()[__currentStep].canPrevious" (click)="prev()">上一步</button>
    <button *ngIf="__currentStep !== totalStep - 1" class="ui green button" [disabled]="!steps.toArray()[__currentStep].canNext" (click)="next()">下一步</button>
    <button *ngIf="__currentStep === totalStep - 1" class="ui green button" [disabled]="!steps.toArray()[__currentStep].canNext" (click)="finish()">完成</button>
  </div>
  `,
  styles: [
    // Top and Bottom Margins | Content | Gap between title and description
    ` .ui.steps .step.described {
      height: calc(2 * 1.14285714em + 2em + 3.25px);
    }`,
    ` .ui.steps .step::before {
      width: 35px;
    }`
  ]
})
export class WizardComponent implements AfterContentInit {
  @Output('stepChanged') private onStepChanged: EventEmitter<number> = new EventEmitter<number>()
  @Output('finished') private onFinished: EventEmitter<void> = new EventEmitter<void>()

  // 樣式
  private hasDescription: boolean

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
    this.steps.first.active = true


    this.hasDescription = this.steps.reduce((prev, cur) => prev || cur.description !== undefined, false)
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
