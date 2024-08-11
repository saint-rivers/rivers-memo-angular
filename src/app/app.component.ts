import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '../../libs/ui/src';
import { Memo, MemoViewComponent } from "./components/memo-view/memo-view.component";
import { Tag, TagsViewComponent } from "./components/tags-view/tags-view.component";
import { TagEditComponent } from './components/tag-edit/tag-edit.component';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { NgToggleModule } from 'ng-toggle-button';
import { CommonModule } from '@angular/common';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import { provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideUndo2 } from '@ng-icons/lucide';
import { DropdownMenuComponent } from "./ui/dropdown-menu/dropdown-menu.component";
import { MenuActionDirective } from './directives/menu-action.directive';
import { MemoInputComponent } from "./components/memo-input/memo-input.component";
import { MemoEditComponent } from "./components/memo-edit/memo-edit.component";
import { BookmarksComponent } from "./pages/bookmarks/bookmarks.component";

export type UiMode = "view" | "edit";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HlmButtonDirective,
    MemoViewComponent,
    TagsViewComponent,
    TagEditComponent,
    HlmSwitchComponent,
    HlmLabelDirective,
    HlmCheckboxComponent,
    NgToggleModule,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    HlmSubMenuComponent,
    DropdownMenuComponent,
    MenuActionDirective,
    MemoInputComponent,
    MemoEditComponent,
    BookmarksComponent
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