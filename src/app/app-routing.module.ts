import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLibraryComponent } from './components/home-library/home-library.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookEditorComponent } from './components/book-editor/book-editor.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { CardBookComponent } from './components/card-book/card-book.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';



const routes: Routes = [

{path: 'home', component: HomeLibraryComponent},
{path: 'list', component: BookListComponent},
{path: 'editor/:id', component: BookEditorComponent},
{path: '', redirectTo: 'home',pathMatch:'full'},
{path: 'favourites', component: FavouritesComponent,canActivate: [AuthGuard]},
{path: 'book-card/:id', component: CardBookComponent},
{path: 'editor', component: BookEditorComponent, canActivate: [AuthGuard]},
{path: 'login', component: LoginComponent},
{path: 'register-user', component: RegisterComponent},
{path: 'register', component: BookEditorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
