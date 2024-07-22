import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemoService } from '@services/memo.service';

type Tag = { name: string, isSelected: boolean }

@Component({
  selector: 'app-tags-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tags-view.component.html',
  styleUrl: './tags-view.component.css'
})
export class TagsViewComponent {

  constructor(private memoService: MemoService) { }

  tags: Tag[] = [];

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
  }
}
