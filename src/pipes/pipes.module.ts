import { NgModule } from '@angular/core'

import { GroupNamePipe } from './group-name.pipe'
import { UnitNamePipe } from './unit-name.pipe'
import { UserNamePipe } from './user-name.pipe'
import { ChineseDatePipe } from './chinese-date.pipe'

export { GroupNamePipe } from './group-name.pipe'
export { UnitNamePipe } from './unit-name.pipe'
export { UserNamePipe } from './user-name.pipe'
export { ChineseDatePipe } from './chinese-date.pipe'


@NgModule({
  declarations: [
    ChineseDatePipe,
    GroupNamePipe,
    UnitNamePipe,
    UserNamePipe
  ],
  exports: [
    ChineseDatePipe,
    GroupNamePipe,
    UnitNamePipe,
    UserNamePipe
  ]
})
export class pipesModule { }
