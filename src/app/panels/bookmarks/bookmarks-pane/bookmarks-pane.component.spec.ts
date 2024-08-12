import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksPaneComponent } from './bookmarks-pane.component';

describe('BookmarksComponent', () => {
  let component: BookmarksPaneComponent;
  let fixture: ComponentFixture<BookmarksPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarksPaneComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookmarksPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
