import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '../../libs/ui/src';
import { Memo, MemoViewComponent } from "./components/memo-view/memo-view.component";
import { Tag, TagsViewComponent } from "./components/tags-view/tags-view.component";
import { TagEditComponent } from './components/tag-edit/tag-edit.component';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { NgToggleModule } from 'ng-toggle-button';

export type UiMode = "view" | "edit";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HlmButtonDirective,
    MemoViewComponent,
    TagsViewComponent,
    TagEditComponent,
    HlmSwitchComponent,
    HlmLabelDirective,
    HlmCheckboxComponent,
    NgToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  setMemo(m: Memo) {
    this.selectedMemo = m;
  }

  mode: UiMode = "view";
  detechModeChange(mode: UiMode) {
    this.mode = mode;
  }

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
