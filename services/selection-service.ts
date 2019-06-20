import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class SlimPopSelectionService {
    private subject = new Subject<any>();
    public random_gen = Math.random().toString(36).substr(2, 5); 
    constructor() { }

    saveSingleSelection(obj: any) {
        this.subject.next({ selection: [obj] });
    }

    clearSingleSelection() {
        this.subject.next();
    }

    getTempSavedSelection(): Observable<any> {
        return this.subject.asObservable();
    }

    localSavedSelection(data, popupId) {
        const ruid = 'modal_id_' + popupId;
        localStorage.setItem(ruid, JSON.stringify(data));
    }

    localRemoveSelection(popupId) {
        const ruid = 'modal_id_' + popupId;
        localStorage.removeItem(ruid);
    }

    public localGetSelection(popupId?: any): Observable<any> {
        const local = JSON.parse(localStorage.getItem('modal_id_' + popupId));
        // for (let i = 0; i < localStorage.length; i++){
        //     let key = localStorage.key(i);
        //     let value = localStorage.getItem(key);
        //     console.log(key, value);
        // }
        if (!local) {
            return local;
        }
        console.log(local.selection[0]);
        return Observable.fromPromise(local.selection[0]);
    }

}
