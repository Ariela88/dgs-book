import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BookStorageService } from 'src/app/services/book-storage.service';
import { CommonModule } from '@angular/common';


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
        CommonModule
    ],
})
export class HeaderComponent {
  constructor(private router: Router, public colorService:ThemeService, public storage:BookStorageService){
    this.storage.isUserLoggedIn()
  }

  user:boolean = false

  isLightTheme: boolean = true;
  

  toggleColore(): void {
    this.colorService.toggleColore();
  } 

  changeTheme(){
    this.isLightTheme = !this.isLightTheme;
    document.body.classList.toggle('super-dark')
  }

  logout(){
    this.storage.logOut()

  }

}
