/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotfyDestroyService } from './notfyDestroy.service';

describe('Service: Notfydestroy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotfyDestroyService]
    });
  });

  it('should ...', inject([NotfyDestroyService], (service: NotfyDestroyService) => {
    expect(service).toBeTruthy();
  }));
});
