import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';
import { MemoService } from '@services/memo.service';
import { ImageFallbackDirective } from '@directives/image-fallback.directive';
import { RightClickDirective } from '@directives/right-click.directive';
import { FunctionButtonComponent } from '@components/function-button/function-button.component';

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
    ImageFallbackDirective,
    RightClickDirective,
    FunctionButtonComponent
  ],
  templateUrl: './memo-view.component.html',
  styleUrl: './memo-view.component.css'
})
export class MemoViewComponent {
  size = 10;
  lastId = "";
  idHistory: string[] = [];

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

  nextPage() {
    if (this.memos.length > 0) {
      this.idHistory.push(this.lastId);
      this.lastId = this.memos[this.memos.length - 1].id.toString();
      this.memoService.fetchMemos(this.size, this.lastId);
    }
  }
  previousPage() {
    this.lastId = this.idHistory.pop() ?? "";
    this.memoService.fetchMemos(this.size, this.lastId);
  }
}
