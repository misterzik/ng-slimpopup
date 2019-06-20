import { Component, OnInit, Input } from '@angular/core';
import { SlimPopModalService } from '../services/modal.service';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'slim-pop',
  templateUrl: './open-modal.component.html'
})
export class SlimPopOpenModalComponent implements OnInit {
  @Input() popupId: any;
  @Input() label: any;
  @Input() config: any;
  public _internalPopUpId: any;

  constructor(private slimModalSvc: SlimPopModalService) { 
    // Color Options
    // btn-flat | btn-primary
    if (!this.config === undefined) {
      this.config = {
          selector: '',
          label: 'TESTING',
          color: '',
          class: ''
      };
    }
  }

  ngOnInit(): void {
    this._internalPopUpId = this.popupId;
  }

  openModal(popId: string): void {
    this.slimModalSvc.open(popId);
  }

}
