import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactDetails } from './modal-contact-details';

describe('ModalContactDetails', () => {
  let component: ModalContactDetails;
  let fixture: ComponentFixture<ModalContactDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContactDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContactDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
