import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ImageFallbackDirective } from '@directives/image-fallback.directive';
import { Memo } from '@panels/memo/memo-view/memo-view.component';

@Component({
  selector: 'app-link-card',
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective],
  templateUrl: './link-card.component.html',
  styleUrl: './link-card.component.css'
})
export class LinkCardComponent {

  @Input() memo!: Memo;
}
