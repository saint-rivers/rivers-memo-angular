import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoViewComponent } from './memo-view.component';

describe('MemoViewComponent', () => {
  let component: MemoViewComponent;
  let fixture: ComponentFixture<MemoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
