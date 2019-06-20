import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { SlimPopModalService } from '../services/modal.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'slim-modal',
  template: '<ng-content></ng-content>'
})

export class SlimPopupModalComponent implements OnInit, OnDestroy {

  @Input() popupId: string;
  private element: any;
  public config: any;

  constructor(
    private slimModalSvc: SlimPopModalService,
    private el: ElementRef
  ) {
      this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
    const modal = this;
    if (!this.popupId) {
      console.error(`No popupId matched - ${this.popupId}`); return;
    }

    document.body.appendChild(this.element);
    this.element.addEventListener('click', (e: any) => {
      if (e.target.className === 'modal') {
        modal.close();
      }
    });
    this.slimModalSvc.add(this);
  }

  ngOnDestroy(): void {
    this.slimModalSvc.remove(this.popupId);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

}
