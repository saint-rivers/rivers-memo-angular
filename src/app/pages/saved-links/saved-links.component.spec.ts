import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedLinksComponent } from './saved-links.component';

describe('SavedLinksComponent', () => {
  let component: SavedLinksComponent;
  let fixture: ComponentFixture<SavedLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
