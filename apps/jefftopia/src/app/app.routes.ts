import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
    {
        loadChildren: './landing/landing.module#LandingModule',
        path: '',
        // data: {

        // }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],  //{ initialNavigation: 'enabled' }
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
