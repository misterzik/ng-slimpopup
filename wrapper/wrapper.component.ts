import { Component, OnInit, OnChanges, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { Input, ViewChild, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';
import { SlimPopModalService, SlimPopSelectionService, SlimConfig } from '../services';
import { SlimPopCatNodeComponent } from './Node.component';
import * as _ from 'lodash';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'slim-pop-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})

export class SlimPopWrapperComponent implements OnInit, OnChanges, OnDestroy {
  /*
   * Configurations
   */
  @Input() config?: any;
  @Output() saved = new EventEmitter();
  @Output() closed = new EventEmitter();
  @HostListener('window:scroll', ['$event'])
  @ViewChild('container') container: any;

  private popupId: any;
  private items: any[] = [];
  private level: any;
  private savedData: any;
  private modalConfig;
  public isLoaded: boolean;

  constructor(
    private slimPopServ: SlimPopModalService,
    private slimPopSelection: SlimPopSelectionService,
    public el: ElementRef,
    private resolver: ComponentFactoryResolver
  ) {
    this.isLoaded = false;
    if (this.config === undefined) {
      this.config = {
        theme: {
          header_container: {
            title: 'SELECT CATEGORIES TO BROWSE',
            left_image: '../scss/assets/category.png',
            left_width: '24px',
            right_image: '../scss/assets/category.png',
            right_width: '24px',
            background: '#fff'
          },
          body_container: {
            title: '',
            background: '#fff'
          },
          footer_container: {
            title: '',
            background: '#fff'
          }
        },
        db: {
          url: 'http://localhost:8080/api/v1/'
        },
        buttons: {
          left: {
            label: 'DONE',
            color: 'btn-primary',
            class: '',
          },
          right: {
            label: 'CANCEL',
            color: 'btn-flat',
            class: '',
          }
        },
        selector: {
          id: ''
        },
        debug: {
          enabled: false
        }
      };
    }

   }

  ngOnInit() {
    this.popupId = this.config.selector.id;
    this.slimPopServ.getModel(this.loaded.bind(this), this.config.db.url);
    const f = this.resolver.resolveComponentFactory(SlimPopCatNodeComponent);
  }

  ngOnDestroy() {
      // console.log("exintg");
  }

  ngOnChanges(changes) {
    this.refresh();
    this.slimPopSelection.getTempSavedSelection().subscribe(data => {
      this.savedData = data;
    });
  }

  loaded() {
    // console.log('It\'s loaded.');
    this.isLoaded = true;
  }

  closeModal(popopupId: string) {
    this.closed.emit('Closing POPID: ' + popopupId);
    this.slimPopSelection.localRemoveSelection(popopupId);
    this.slimPopServ.close(popopupId);
  }

  saveModal(data: any, popId: any) {
    this.saved.emit('Saving Selection: ' + JSON.stringify(data));
    this.slimPopSelection.localSavedSelection(data, popId);
    this.slimPopServ.close(popId);
  }

  // Refresh Functionality
  refresh() {

    const queue = this.slimPopServ.getScrollQueueList();
    const scrollTop = this.container.nativeElement.scrollTop; 
    const height = this.container.nativeElement.clientHeight;

    const sortedQueue = _.sortBy(queue, ['position']);
    const focusedNode = _.findLast(sortedQueue, function(node) {
      return node.position < (scrollTop + height);
    });

    if (focusedNode !== undefined) {
      focusedNode.callBack();
      // const nodeIndex= _.findLast(queue, { 'nodeId': focusedNode.nodeId });
      this.slimPopServ.deregisterCatNode(focusedNode.nodeId);
    }
  }
}
