import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { BookListComponent } from '../book-list/book-list.component';


@Component({
  selector: 'app-home-library',
  standalone: true,
  imports: [CommonModule,MaterialModule,BookListComponent],
  templateUrl: './home-library.component.html',
  styleUrls: ['./home-library.component.scss']
})
export class HomeLibraryComponent{
  


}
