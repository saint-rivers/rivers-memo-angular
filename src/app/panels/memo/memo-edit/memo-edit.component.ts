import { Component, EventEmitter, Output } from '@angular/core';
import { MemoService } from '@services/memo.service';
import { Memo } from '../memo-view/memo-view.component';
import { CommonModule } from '@angular/common';
import { ImageFallbackDirective } from '@directives/image-fallback.directive';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-memo-edit',
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective, ReactiveFormsModule],
  templateUrl: './memo-edit.component.html',
  styleUrl: './memo-edit.component.css'
})
export class MemoEditComponent {

  memo: Memo | null = null;
  assignedTags: string[] = [];
  originalTags: string[] = [];
  isSaving = false;

  tag: FormControl<string> = new FormControl();
  @Output() tagsSet = new EventEmitter();

  constructor(
    private memoService: MemoService,
  ) {
  }

  ngOnInit(): void {
    this.memoService.editingMemo$
      .subscribe(data => {
        this.memo = data;
        if (this.memo != null) {
          if (this.memo.tags.length > 0) {
            this.assignedTags = this.memo.tags;
            this.originalTags = this.memo.tags;
            return;
          }
        }
        this.assignedTags = [];
        this.originalTags = [];
      });
  }

  updateTags() {
    // check which tags were added and which were removed
    const removed = this.originalTags.filter(t => !this.assignedTags.includes(t));
    const added = this.assignedTags;

    if (this.assignedTags.length <= 0) return;
    if (this.memo == undefined) {
      alert("select a memo");
      return;
    }

    this.isSaving = true;
    this.memoService
      .putTags(this.memo.id, added, removed, () => {
        this.tag.reset();
        this.tagsSet.emit(true);
        this.isSaving = false;
      })
  }

  addTagToList(e: SubmitEvent) {
    e.preventDefault();
    if (this.assignedTags === undefined) {
      this.assignedTags = [];
    }
    this.assignedTags.push(this.tag.value);
    this.tag.reset();
  }

  removeTag(tag: string) {
    this.assignedTags = this.assignedTags.filter(t => tag !== t);
  }

  closePane() {
    this.memo = null;
  }

  isDeleting = false;
  deleteMemo(id: number) {
    this.isDeleting = true;
    this.memoService.delete(id, () => {
      this.isDeleting = false;
      this.memoService.setEditingMemo(null);
    });
  }

}
