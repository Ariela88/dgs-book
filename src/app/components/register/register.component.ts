import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookStorageService } from 'src/app/services/book-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    psw: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private storage: BookStorageService, private router:Router) {}


  onSubmit() {
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.psw;
    this.storage.saveUser(email!, password!);
    console.log('Registrazione avvenuta con successo');
    this.router.navigateByUrl('home')
  }

}
