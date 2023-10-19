import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatSlideToggleModule,
        MatButtonModule,
        RouterLink,
        MatIconModule,
    ],
})
export class HeaderComponent {
  constructor(private router: Router, public colorService:ThemeService){}


  isLightTheme: boolean = true;

  toggleColore(): void {
    this.colorService.toggleColore();
  } 

  changeTheme(){
    this.isLightTheme = !this.isLightTheme;
    document.body.classList.toggle('super-dark')
  }}
