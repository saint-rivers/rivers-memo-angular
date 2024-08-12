import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';
import { MemoService } from '@services/memo.service';
import { ImageFallbackDirective } from '@directives/image-fallback.directive';
import { RightClickDirective } from '@directives/right-click.directive';
import { FunctionButtonComponent } from '@components/function-button/function-button.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LinkCardComponent } from '@components/link-card/link-card.component';

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
    ReactiveFormsModule,
    ImageFallbackDirective,
    RightClickDirective,
    FunctionButtonComponent,
    LinkCardComponent,
  ],
  templateUrl: './memo-view.component.html',
  styleUrl: './memo-view.component.css'
})
export class MemoViewComponent {
  key = new FormControl('')
  searchResults: Memo[] = [];
  search(e: SubmitEvent) {
    e.preventDefault();
    this.memoService.searchMemo(this.key.value!, this.memoService.size, 0)
      .subscribe((res: any) => {
        console.log(res);

        this.searchResults = res;
      })
  }

  lastId: number = 0;
  idHistory: number[] = [];

  constructor(private memoService: MemoService) { }

  memos: Memo[] = [];
  selectedMemo: Memo | null = null;
  ngOnInit() {
    this.memoService
      .fetchMemos(this.memoService.size);
    this.memoService.memos$
      .subscribe((res: Memo[]) => {
        this.memos = res;
      });
    this.memoService.editingMemo$
      .subscribe((res: Memo | null) => {
        this.selectedMemo = res;
      });
    this.memoService.lastId
      .subscribe((last: number) => {
        this.lastId = last;
      });
  }

  @Input() selectedTags!: string[];
  ngOnChanges() {
    this.memoService
      .fetchTagFilteredMemoes(this.memoService.size, this.selectedTags, this.lastId);
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
      this.lastId = this.memos[this.memos.length - 1].id;
      this.memoService.fetchMemos(this.memoService.size, this.lastId);
    }
  }
  previousPage() {
    this.lastId = this.idHistory.pop() ?? 0;
    this.memoService.fetchMemos(this.memoService.size, this.lastId);
  }
}
