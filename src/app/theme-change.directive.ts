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
    //   this.renderer.setStyle(this.el.nativeElement, 'color', 'white'); // Imposta il colore del font a nero
    // }
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    // Controlla se l'evento è originato dal pulsante stesso
    if (event.target instanceof HTMLButtonElement) {
      // Fermiamo la propagazione dell'evento
      event.stopPropagation();

      // Chiamiamo la funzione nel ThemeService e aggiorniamo il colore
      this.themeService.toggleColore();
      const color = this.themeService.isColoreCambiato() ? 'red' : 'black';
      this.renderer.setStyle(this.el.nativeElement, 'color', color);
    }
  }
}
