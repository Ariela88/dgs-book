import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Directive({
    selector: '[appThemeChange]',
    standalone: true
})
export class ThemeChangeDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {
    // if (this.themeService.isColoreCambiato()) {
    //   this.renderer.setStyle(this.el.nativeElement, 'color', 'white'); 
    // }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
       if (event.target instanceof HTMLButtonElement) {
      event.stopPropagation();
      this.themeService.toggleColore();
      const color = this.themeService.isColoreCambiato() ? 'red' : 'black';
      this.renderer.setStyle(this.el.nativeElement, 'color', color);
    }
  }
}
