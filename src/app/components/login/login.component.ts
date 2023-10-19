import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookStorageService } from 'src/app/services/book-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showPassword: boolean = false;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    psw: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private storage: BookStorageService,private router:Router) {}

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.psw;
    const savedUser = this.storage.getUser();

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      this.router.navigateByUrl('home')
     
    } else {
      console.log('Login failed');
    }
  }
  
  resetPass(){
    this.loginForm.reset()
  }
}
