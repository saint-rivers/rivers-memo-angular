import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MemoService } from '@services/memo.service';
import { UiMode } from '../../app.component';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';
import { ContextMenuComponent } from '../../ui/context-menu/context-menu.component';
import { BrnContextMenuTriggerDirective, BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemCheckComponent,
  HlmMenuItemCheckboxDirective,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemRadioComponent,
  HlmMenuItemRadioDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import { RightClickDirective } from '../../directives/right-click.directive';

export type Memo = {
  id: number,
  title: string,
  link: string,
  description: string,
  tags: string[]
  image_url: string;
}

@Component({
  selector: 'app-memo-view',
  standalone: true,
  imports: [
    CommonModule,
    ContextMenuComponent,
    ImageFallbackDirective,
    RightClickDirective,
  ],
  templateUrl: './memo-view.component.html',
  styleUrl: './memo-view.component.css'
})
export class MemoViewComponent {
  size = 10;
  lastId = "";

  constructor(private memoService: MemoService) { }

  memos: Memo[] = [];
  selectedMemo: Memo | null = null;
  ngOnInit() {
    this.memoService
      .fetchMemos(this.size);
    this.memoService.memos$
      .subscribe((res: Memo[]) => {
        this.memos = res;
      });
    this.memoService.editingMemo$
      .subscribe((res: Memo | null) => {
        this.selectedMemo = res;
      });
  }

  @Input() selectedTags!: string[];
  ngOnChanges() {
    this.memoService
      .fetchTagFilteredMemoes(this.size, this.selectedTags, this.lastId);
    this.memoService.memos$
      .subscribe((res: any) => {
        this.memos = res;
      });
  }

  // memoContextMenuVisible = false;
  selectMemo(e: MouseEvent, memo: Memo) {
    if (this.selectedMemo != null) {
      if (this.selectedMemo.id === memo.id) {
        this.memoService.setEditingMemo(null);
      } else {
        this.memoService.setEditingMemo(memo);
      }
    } else {
      this.memoService.setEditingMemo(memo);
    }
  }
}
