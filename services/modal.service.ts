import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SlimPopModalService {
    private scrollQueueList: any[] = [];
    private modals: any[] = [];
    public dataModel: any = [];

    constructor(private http: HttpClient) { }

    /*
     * SlimPOPUP Functionality
     * ______________________
     * Build Configuration with Model from Input
     */

    // Get Test-API
    getConfig(url) {
        return this.http.get(url);
    }

    // Get Model and Trigger Callback
    getModel(callBack, url) {
        this.getConfig(url).subscribe((data) => {
            this.dataModel = data;
            callBack();
        });
    }

    // Get Model based on level
    getModelBasedonLevel(level: number, parentId: number, parentObj: string) {
        const preffix = parentObj;
        if (parentId === -1) {
            return this.dataModel[level - 1].SlimPOPDetails;
        } else {
            return _.filter(this.dataModel[level - 1].SlimPOPDetails, { 'ParentID': parentId });
        }
    }

    /*
     * SlimPOPUP Functionality
     * ______________________
     * Modal Functionality
     */
    // Pushes new element to dom once button triggered
    add(modal: any) {
        this.modals.push(modal);
    }

    // Remove's modal by id
    remove(popId: string) {
        this.modals = this.modals.filter(x => x.popupId !== popId);
    }

    // Filter's through id to get proper wrapper container
    open(popId: string) {
        const modal: any = this.modals.filter(
            x => x.popId === popId
        )[0];
        modal.open();
    }

    // Closes popup by id
    close(popId: string) {
        const modal: any = this.modals.filter(
            x => x.popupId === popId
        )[0];
        modal.close();
        location.reload();
    }

    // Save Func
    save(randomModel: any) {
        this.modals.push(randomModel);
    }

    /*
     * SlimPOPUP Functionality
     * ______________________
     * Register Expanded Section to allow to dynamically
     * add new sections.
     */

    // Register Category Node
    registerCatNode(nodeId: number, position: number, callBack: any) {
        this.scrollQueueList.push({ nodeId: nodeId, position: position, callBack: callBack });
    }

    // Return Queuee on list
    getScrollQueueList() {
        return this.scrollQueueList;
    }

    // Deregister Category Node
    deregisterCatNode(nodeId: number) {
        _.remove(this.scrollQueueList, (node) => {
            return node.nodeId === nodeId;
        });
        // this.scrollQueueList=this.scrollQueueList.splice(nodeIndex,1);
        // this.scrollQueueList.pop({ nodeId : nodeId, position:position, callBack:callBack });
    }


}
