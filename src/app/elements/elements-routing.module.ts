import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFormComponent } from './add-form/add-form.component';

const routes: Routes = [
  {
    path: '',
    component: AddFormComponent
  },
  {
    path: ':id',
    component: AddFormComponent
  },  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementsRoutingModule { }
