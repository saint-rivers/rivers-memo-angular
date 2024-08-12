import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-function-button',
  standalone: true,
  imports: [],
  templateUrl: './function-button.component.html',
  styleUrl: './function-button.component.css'
})
export class FunctionButtonComponent {

  @Input() matIconName = 'info';
  @Output() click = new EventEmitter<boolean>();

  onClick() {
    this.click.emit(true);
  }
}
