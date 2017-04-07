import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WizardComponent } from './wizard.component'
import { StepDirective } from './step.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [
    WizardComponent,
    StepDirective
  ],
  exports: [
    WizardComponent,
    StepDirective
  ]
})
export class wizardModule { }
