import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { BookEditorComponent } from './components/book-editor/book-editor.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CardBookComponent } from './components/card-book/card-book.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { HomeLibraryComponent } from './components/home-library/home-library.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookEditorComponent,
    BookListComponent,
    CardBookComponent,
    FavouritesComponent,
    HomeLibraryComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
