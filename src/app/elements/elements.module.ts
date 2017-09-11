import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ElementsRoutingModule } from './elements-routing.module';
import { AddFormComponent } from './add-form/add-form.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ElementsRoutingModule
  ],
  declarations: [AddFormComponent, ListComponent],
  exports: [ AddFormComponent, ListComponent ]
})
export class ElementsModule { }
