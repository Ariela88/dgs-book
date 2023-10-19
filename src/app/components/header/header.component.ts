import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { BookStorageService } from 'src/app/services/book-storage.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material/material.module';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
       MaterialModule,
        RouterLink,
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
