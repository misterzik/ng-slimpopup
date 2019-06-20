import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ComponentFactory } from '@angular/core';
import { ComponentFactoryResolver, ViewContainerRef, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { SlimItemListComponent } from './item-list.component';
import { SlimPopModalService, SlimPopSelectionService } from '../services';
import * as _ from 'lodash';

@Component({
  entryComponents: [
    SlimItemListComponent
  ],
  // tslint:disable-next-line: component-selector
  selector: 'slimpop-node',
  templateUrl: './Node.component.html',
  styleUrls: ['./Node.component.scss']
})
export class SlimPopCatNodeComponent implements OnInit, AfterViewInit {
  /*
   * Configurations
   */
  @ViewChild('templateContainer', { read: ViewContainerRef })
  set content(content: ViewContainerRef) {
    this.templateContainer = content;
  }
  @Input() item: any;
  @Input() level: number;
  @Input() scrollY: any;
  @Input() callBack: any;
  @Input() arrows: any;

  private gutter: boolean = false;
  public gutterMsg: any;
  private guId: any;
  public guLvl: any;

  public flag: boolean = false;
  public _lastFlag: boolean = false;
  private hasChild: any;
  public scrollXY;

  private templateContainer: ViewContainerRef;

  @Output() scrollPosition: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('itemSelection') container: any;
  private componentFactory; 
  private containerRef; 
  private componentRef;


  constructor(
    private catalogModalService: SlimPopModalService,
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private slimPopSelection: SlimPopSelectionService) {
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.item.hasOwnProperty('markHasScrolled')) {
      this.catalogModalService.registerCatNode(this.item.ID, this.el.nativeElement.offsetTop, this.callBack.bind(this));
    }
    setTimeout(() => {
      if (this.item['ChildCount'] === 0) {
        this.cd.detectChanges();
        this.flag = true;
        this._lastFlag = true;
      }
    }, 1);

  }

  showHideSubLevel(flagVal: boolean) {
    this.hasChild = this.item['ChildCount'];
    if (this.hasChild > 0) {
      this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(SlimItemListComponent);
      this.containerRef = this.templateContainer;
      this.containerRef.clear();
      this.componentRef = <SlimItemListComponent>this.containerRef.createComponent(this.componentFactory);
      this.componentRef.instance._ref = this.componentRef;
      this.componentRef.instance.parentId = this.item.ID;
      this.componentRef.instance.level = this.item.Level + 1;
      this.componentRef.instance.cssClass = '';

      if (this.item.childCount === 0) {
        alert('End of List - No Children Found');
      }
    }
    this.flag = flagVal;
  }

  removeObj(flagVal: boolean) {
    this.templateContainer.clear();
    this.flag = flagVal;
  }

  currentSelection(gutterVal, gId): void {
    this.gutter = gutterVal;
    this.guId = gId;
    this.slimPopSelection.saveSingleSelection(gId);
    // For Gutter
    // if (this.gutter === true) {
    //   this.gutterMsg = this.guId;
    // } else {
    //   this.gutterMsg = 'Selected Item';
    // }
  }


}
