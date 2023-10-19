import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
