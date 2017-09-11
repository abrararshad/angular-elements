import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database';
import * as _ from 'underscore';

import { element } from '../../stub/element';
import { DataService } from '../../services/data.service';
import { elementI } from '../../interfaces/element';

declare var require: any;
const uuidv1 = require('uuid/v1');

@Component({
  selector: 'element-add-form',
  moduleId: module.id,
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  public form: FormGroup;
  public isBeingEdited: boolean = false;

  public elements: FirebaseListObservable<elementI[]>;

  constructor(private dataService: DataService, 
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      
      if(!_.isUndefined(params.id)) {
        this.dataService.fetchElement(params.id).subscribe(element => {
          
          if(!_.isUndefined(element.id)) {
            this.form.setValue({
              id: element.id,
              title: element.title,
              color: element.color,
              text: element.text,
              sort: element.sort
            });

            this.isBeingEdited = true;
          }

        });        
      }

    });   
  }

  buildForm() {
    this.form = this.fb.group({
      id: [uuidv1(), Validators.required],
      title: ['', Validators.required],
      color: ['', Validators.required],
      text: ['', Validators.required],
      sort: ''
    });
  }

  onSubmit() {
    const form = this.form;

    if(!form.valid) {
      alert('Please make sure to fill all info');
      return;
    }

    const id = form.get('id').value,
          title = form.get('title').value,
          color = form.get('color').value,
          text = form.get('text').value,
          sort = this.isBeingEdited ?  form.get('sort').value : 999999999;

    let eleData = new element(id, title, color, text, sort);
    this.dataService.addElement(eleData);

    this.reset();
  }

  reset(){
    this.form.reset();
    this.form.get('id').setValue(uuidv1());

    if(this.isBeingEdited) {
      this.router.navigate(['/']);
    }

  }

  delete(){
    if(this.isBeingEdited) {
      const id = this.form.get('id').value;
      console.log('removing id', id);
      this.dataService.removeElement(id);

      this.reset();
    }
  }  

}
