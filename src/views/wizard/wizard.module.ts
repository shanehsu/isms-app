import { NgModule, Directive } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WizardComponent } from './wizard.component'
import { StepDirective } from './step.directive'

@Directive({ selector: 'done' })
class DoneDirective { }

@NgModule({
  imports: [CommonModule],
  declarations: [
    WizardComponent,
    StepDirective,
    DoneDirective
  ],
  exports: [
    WizardComponent,
    StepDirective,
    DoneDirective
  ]
})
export class wizardModule { }
