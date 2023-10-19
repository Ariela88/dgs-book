import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  private colorChange = false;

  toggleColore(): void {
    console.log("Cambiamento colore avviato");
    this.colorChange = !this.colorChange;
  }

  isColoreCambiato(): boolean {
    return this.colorChange;
  }
}
