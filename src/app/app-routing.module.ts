import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLibraryComponent } from './components/home-library/home-library.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookEditorComponent } from './components/book-editor/book-editor.component';
import { BookAddComponent } from './components/book-add/book-add.component';



const routes: Routes = [

{path: 'home', component: HomeLibraryComponent},
{path: 'list', component: BookListComponent},
{ path: 'editor/:id', component: BookEditorComponent },
{path: '', redirectTo: 'home',pathMatch:'full'},
{ path: 'add', component: BookAddComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
