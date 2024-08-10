import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMenuAction]',
  standalone: true
})
export class MenuActionDirective {

  constructor(elem: ElementRef, renderer: Renderer2) {
    // let shark = renderer.createText('Shark ');
    // renderer.appendChild(elem.nativeElement, shark);
  }

}
