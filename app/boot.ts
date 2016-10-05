"use strict"

// Get RxJS to Work
import 'rxjs/add/operator/map'

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {AppModule} from './app.module'

platformBrowserDynamic().bootstrapModule(AppModule)
