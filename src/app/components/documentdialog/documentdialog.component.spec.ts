import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentdialogComponent } from './documentdialog.component';

describe('DocumentdialogComponent', () => {
  let component: DocumentdialogComponent;
  let fixture: ComponentFixture<DocumentdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
