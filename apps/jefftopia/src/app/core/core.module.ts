import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { JSNavbar } from './navbar/navbar.component';

import * as State from './state';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    JSNavbar
  ],
  imports: [
    SharedModule,
    StoreModule.forRoot(State.REDUCERS, { initialState: State.DEFAULT_STATE })
  ],
  exports: [
    JSNavbar
  ]
})
export class CoreModule { }
