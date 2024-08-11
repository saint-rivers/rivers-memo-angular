import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { Memo } from '../memo-view/memo-view.component';
import { MemoService } from '@services/memo.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';

@Component({
  selector: 'app-tag-edit',
  standalone: true,
  imports: [
    CommonModule,
    HlmInputDirective,
    HlmBadgeDirective,
    ReactiveFormsModule,
    ImageFallbackDirective,
  ],
  templateUrl: './tag-edit.component.html',
  styleUrl: './tag-edit.component.css'
})
export class TagEditComponent {
  tag: FormControl<string> = new FormControl()
  assignedTags: string[] = []
  @Output() tagsSet = new EventEmitter();

  appendTags() {
    // check which tags were added and which were removed
    const removed = this.originalTags.filter(t => !this.assignedTags.includes(t));
    const added = this.assignedTags;

    if (this.assignedTags.length <= 0) return;
    if (this.memo == undefined) {
      alert("select a memo");
      return;
    }

    // this.memoService
    //   .putTags(this.memo.id, added, removed)
    //   .subscribe((r: any) => {
    //     this.tag.setValue("");
    //     this.assignedTags = [];
    //     this.tagsSet.emit(true);
    //   });
  }

  @Input() memo?: Memo
  originalTags: string[] = []

  addTagToList(e: SubmitEvent) {
    e.preventDefault();
    this.assignedTags.push(this.tag.value);
    this.tag.setValue("");
  }

  removeTag(tag: string) {
    this.assignedTags = this.assignedTags.filter(t => tag !== t);
  }

  constructor(private memoService: MemoService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.memo != undefined) {
      if (this.memo.tags == undefined) {
        this.assignedTags = [];
        return;
      };
      this.assignedTags = this.memo.tags;
      this.originalTags = this.assignedTags;
    }
  }
}
