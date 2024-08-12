import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MemoService } from '@services/memo.service';
import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm';


export type Tag = { name: string, isSelected: boolean }

@Component({
  selector: 'app-tags-view',
  standalone: true,
  imports: [CommonModule, HlmScrollAreaComponent],
  templateUrl: './tags-view.component.html',
  styleUrl: './tags-view.component.css'
})
export class TagsViewComponent {

  constructor(private memoService: MemoService) { }

  tags: Tag[] = [];
  @Output() select: EventEmitter<Tag[]> = new EventEmitter();

  ngOnInit(): void {
    this.memoService
      .fetchTags()
      .subscribe((data) => {
        this.tags = data.map((tag) => ({ name: tag, isSelected: false }));
      })
  }

  selectTag(tag: string) {
    this.tags = this.tags.map((t) => {
      if (t.name == tag) return { name: t.name, isSelected: !t.isSelected };
      else return t;
    });
    this.select.emit(this.tags);
  }

  clearTags() {
    this.tags = this.tags.map((t) => ({ name: t.name, isSelected: false }));
    this.select.emit([]);
  }
}
