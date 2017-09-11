import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';
import * as Sortable from 'sortablejs';
import * as _ from 'underscore';

import { DataService } from '../../services/data.service';
import { elementI } from '../../interfaces/element';

@Component({
  selector: 'elements-list',
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('list') listRef: ElementRef;

  public elements: FirebaseListObservable<elementI[]>;
  public list_message: string; 

  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit() {
    this.elements = this.dataService.fetchElements();
    this.elements.subscribe(data => {
      if(_.size(data) < 1) 
        this.list_message = 'There are currently no elements created';
      else
        this.list_message = '';

    });

    const list = this.listRef.nativeElement;
    let listSortable = Sortable.create(list, {
      handle: '.dragger',
      dataIdAttr: 'data-id',
      store: {
        get: () => { return [] },
        set: (sortable) => {
          const order = sortable.toArray();

          // TODO: replace with one call instead of multiples
          _.each(order, (id, sort) => {
            this.dataService.updateElement(id, {sort: sort});
          });

        
          this.router.navigate(['/']);
          
        }
      }
    });

  }

}
