import { OnInit, Component, Input, ViewEncapsulation } from '@angular/core';
import { SlimPopModalService } from '../services/modal.service';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'slim-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SlimItemListComponent implements OnInit {

  @Input() parentId: number = -1;
  @Input() level: number = 0;
  @Input() arrowConfig: any;

  items: any[] = [];
  currentPage: number = 1;
  pageSize: number = 30;

  constructor(private catalogModalService: SlimPopModalService) {}

  ngOnInit() {
    this.items = this.catalogModalService.getModelBasedonLevel(this.level, this.parentId, 'SlimPOPDetails');
  }

  nextPage() {
    this.currentPage += 1;
  }

}

