import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTreeComponent } from './categoriestree.component';

describe('CategoriestreeComponent', () => {
  let component: CategoriesTreeComponent;
  let fixture: ComponentFixture<CategoriesTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesTreeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoriesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
