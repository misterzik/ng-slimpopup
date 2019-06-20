import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// Wrapper Component with modalReference by ID's
// Component that includes Modal Selector and Functionality.
import { SlimPopOpenModalComponent } from './open-modal/open-modal.component';
import { SlimPopupModalComponent } from './modal/modal-popup.component';
import { SlimPopWrapperComponent } from './wrapper/wrapper.component';
import { SlimItemListComponent } from './wrapper/item-list.component';
import { SlimPopCatNodeComponent } from './wrapper/Node.component';

import { SlimPopScrollPipe, SlimPopSelectionService, SlimPopModalService  } from './services';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SlimPopOpenModalComponent,
    SlimPopupModalComponent,
    SlimPopWrapperComponent,
    SlimItemListComponent,
    SlimPopCatNodeComponent,
    SlimPopScrollPipe
  ],
  exports: [
    SlimPopupModalComponent,
    SlimPopWrapperComponent,
    SlimPopOpenModalComponent,
    SlimItemListComponent
  ],
  entryComponents: [
    SlimPopCatNodeComponent
  ],
})

// As default, providers will always initialize to private
// Object's due to this we are using static forRoot to be able
// to use it within app without declaring it. MrZ
export class SlimPopupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SlimPopupModule,
      providers: [
        SlimPopModalService,
        SlimPopSelectionService
      ]
    };
  }
}
