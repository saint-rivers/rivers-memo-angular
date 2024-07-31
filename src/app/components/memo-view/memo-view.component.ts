import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MemoService } from '@services/memo.service';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm';
import { TagEditComponent } from "../tag-edit/tag-edit.component";
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
import { UiMode } from '../../app.component';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';

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
    BrnSeparatorComponent,
    HlmSeparatorDirective,
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
    HlmScrollAreaComponent,
    HlmSeparatorDirective,
    TagEditComponent,
    ImageFallbackDirective
  ],
  templateUrl: './memo-view.component.html',
  styleUrl: './memo-view.component.css'
})
export class MemoViewComponent {
  @Output() memoSelected = new EventEmitter<Memo>();
  selectMemo(m: Memo) {
    this.memoSelected.emit(m);
  }

  constructor(private memoService: MemoService) { }
  @Input() mode: UiMode = "view";
  size = 10;
  lastId = "";

  memos: any[] = [];
  ngOnInit() {
    this.memoService
      .fetchMemos(this.size)
      .subscribe((res: any) => {
        this.memos = res;
      });
  }

  @Input() selectedTags!: string[];
  ngOnChanges() {
    this.memoService
      .fetchTagFilteredMemoes(this.size, this.selectedTags, this.lastId)
      .subscribe((res: any) => {
        this.memos = res;
      });
  }
}
