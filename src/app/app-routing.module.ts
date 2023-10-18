import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLibraryComponent } from './components/home-library/home-library.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookEditorComponent } from './components/book-editor/book-editor.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { CardBookComponent } from './components/card-book/card-book.component';



const routes: Routes = [

{path: 'home', component: HomeLibraryComponent},
{path: 'list', component: BookListComponent},
{path: 'editor/:id', component: BookEditorComponent},
{path: '', redirectTo: 'home',pathMatch:'full'},
{path: 'add', component: BookAddComponent},
{path: 'favourites', component: FavouritesComponent},
{path: 'book-card/:id', component: CardBookComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
