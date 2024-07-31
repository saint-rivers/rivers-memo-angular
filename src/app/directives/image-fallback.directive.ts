import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImageFallback]',
  standalone: true
})
export class ImageFallbackDirective {

  constructor(private ref: ElementRef) { }

  @Input() alt: string = "";

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement>this.ref.nativeElement;
    element.src = this.alt || 'https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1';
  }

}
