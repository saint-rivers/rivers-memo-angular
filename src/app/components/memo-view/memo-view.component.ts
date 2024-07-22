import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemoService } from '@services/memo.service';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
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
  ],
  templateUrl: './memo-view.component.html',
  styleUrl: './memo-view.component.css'
})
export class MemoViewComponent {

  constructor(private memoService: MemoService) { }

  size = 10;
  lastId = "";

  memo: any[] = [];
  ngOnInit() {
    this.memoService.fetchMemos(this.size)
      .subscribe((res: any) => {
        this.memo = res;
      });
  }
}
