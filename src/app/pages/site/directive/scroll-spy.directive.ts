import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Directive({
  selector: '[appScrollSpy]',
})
export class ScrollSpyDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private scrollService: ScrollService
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const sectionId = this.el.nativeElement.getAttribute('href').substring(1);
    const section = document.getElementById(sectionId);

    if (section) {
      const offsetTop = section.offsetTop;
      const offsetBottom = offsetTop + section.offsetHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        this.renderer.addClass(this.el.nativeElement, 'active');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'active');
      }
    }
  }
}
