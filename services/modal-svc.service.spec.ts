import { TestBed, inject } from '@angular/core/testing';

import { SlimPopModalService } from './modal.service';

describe('ModalSvcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlimPopModalService]
    });
  });

  it('should be created', inject([SlimPopModalService], (service: SlimPopModalService) => {
    expect(service).toBeTruthy();
  }));
});
