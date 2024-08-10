import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MemoService } from '@services/memo.service';
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
      .fetchMemos(this.size);
    this.memoService.memos$
      .subscribe((res: any) => {
        this.memos = res;
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
}
