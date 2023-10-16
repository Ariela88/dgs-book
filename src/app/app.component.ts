import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from './services/book-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dgs-book';

}
