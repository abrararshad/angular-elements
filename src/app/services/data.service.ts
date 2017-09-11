import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {} from 'und'

import { elementI } from '../interfaces/element';

@Injectable()
export class DataService {

    public elements: FirebaseListObservable<any[]>;
    
    constructor(private db: AngularFireDatabase) {

    }

    fetchElements(): FirebaseListObservable<elementI[]>{
        return this.db.list('/elements', {
            query: {
                orderByChild: 'sort'
            }
        });
    }

    fetchElement(id: Number): FirebaseObjectObservable<elementI>{
        return this.db.object('/elements/' + id);
    }

    updateElement(id: Number, data: Object) {
        return this.db.object('/elements/' + id).update(data);
    }    

    removeElement(id: Number){
        return this.db.object('/elements/' + id).remove();
    }

    addElement(element: elementI){
        let update = {};
 
        update['elements/' + element.id] = element;
        this.db.database.ref().update(update);
    }

}