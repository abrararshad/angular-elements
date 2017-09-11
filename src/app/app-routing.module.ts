import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './elements/elements.module#ElementsModule'
    // redirectTo: 'element',
    // pathMatch: 'full',
  },  
  {
    path: '',
    children: [
      {
        path: 'element',
        loadChildren: './elements/elements.module#ElementsModule'
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
