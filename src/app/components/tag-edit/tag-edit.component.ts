import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { Memo } from '../memo-view/memo-view.component';
import { MemoService } from '@services/memo.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-edit',
  standalone: true,
  imports: [CommonModule, HlmInputDirective, HlmBadgeDirective, ReactiveFormsModule],
  templateUrl: './tag-edit.component.html',
  styleUrl: './tag-edit.component.css'
})
export class TagEditComponent {
  tag: FormControl<string> = new FormControl()
  assignedTags: string[] = []
  @Output() tagsSet = new EventEmitter();

  appendTags() {
    if (this.assignedTags.length <= 0) return;
    if (this.memo == undefined) {
      alert("select a memo");
      return;
    }
    this.memoService
      .appendTags(this.memo.id, this.assignedTags)
      .subscribe((r: any) => {
        this.tag.setValue("");
        this.assignedTags = [];
        this.tagsSet.emit(true);
      });
  }

  addTagToList(e: SubmitEvent) {
    e.preventDefault();
    this.assignedTags.push(this.tag.value);
    this.tag.setValue("");
  }

  @Input() memo?: Memo

  constructor(private memoService: MemoService) { }


}
