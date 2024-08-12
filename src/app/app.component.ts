import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideUndo2 } from '@ng-icons/lucide';
import { Tag, TagsViewComponent } from '@panels/memo/tags-view/tags-view.component';
import { BookmarksPaneComponent } from '@panels/bookmarks/bookmarks-pane/bookmarks-pane.component';
import { Memo, MemoViewComponent } from '@panels/memo/memo-view/memo-view.component';
import { MemoInputComponent } from '@panels/memo/memo-input/memo-input.component';
import { MemoEditComponent } from '@panels/memo/memo-edit/memo-edit.component';
import { CommonModule } from '@angular/common';


export type UiMode = "view" | "edit";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TagsViewComponent,
    BookmarksPaneComponent,
    MemoViewComponent,
    MemoInputComponent,
    MemoEditComponent,
  ],
  templateUrl: './app.component.html',
  providers: [provideIcons({ lucideUndo2 })],
  styleUrl: './app.component.css'
})
export class AppComponent {

  selectedTags: string[] = [];
  handleTagSelect(tags: Tag[]) {
    this.selectedTags = tags.filter(tag => tag.isSelected).map(tag => tag.name);
  }

  selectedMemo?: Memo;
  selectMemo(m: Memo) {
    this.selectedMemo = m;
  }

  updatedCallback(success: boolean) {
    if (success) {
      this.selectedTags = [];
      this.selectedMemo = undefined;
    }
  }
}