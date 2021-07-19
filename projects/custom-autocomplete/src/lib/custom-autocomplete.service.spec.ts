import { TestBed } from '@angular/core/testing';

import { CustomAutocompleteService } from './custom-autocomplete.service';

describe('CustomAutocompleteService', () => {
  let service: CustomAutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
