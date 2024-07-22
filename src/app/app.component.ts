import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '../../libs/ui/src';
import { MemoViewComponent } from "./components/memo-view/memo-view.component";
import { BrowserModule } from '@angular/platform-browser';
import { Tag, TagsViewComponent } from "./components/tags-view/tags-view.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HlmButtonDirective,
    MemoViewComponent,
    TagsViewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  selectedTags: string[] = [];
  handleTagSelect(tags: Tag[]) {
    this.selectedTags = tags.filter(tag => tag.isSelected).map(tag => tag.name);
  }

  title = 'rivers-memo-angular';
}
