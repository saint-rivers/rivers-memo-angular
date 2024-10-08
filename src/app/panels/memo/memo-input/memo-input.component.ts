import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MemoService } from '@services/memo.service';

@Component({
  selector: 'app-memo-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './memo-input.component.html',
  styleUrl: './memo-input.component.css'
})
export class MemoInputComponent {

  constructor(private memoService: MemoService) { }
  isSaving = false;

  msg = new FormControl('');

  save(e: SubmitEvent) {
    e.preventDefault();

    if (this.msg.value !== "" && this.msg.value) {
      this.isSaving = true;
      this.memoService.insertMemo(
        { message: this.msg.value, tags: [] },
        () => { this.isSaving = false; }
      );
      this.msg.reset();
      this.postSuccess.emit(true);
    }
  }

  @Output() postSuccess = new EventEmitter<boolean>();
}
