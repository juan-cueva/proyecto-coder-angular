import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @Output() loginState = new EventEmitter<boolean>();
  login: boolean = false;
  formularioLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginState.emit(this.login);
    this.formularioLogin = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
    this.auth.desloggear();

  }

  async btnIngreso(): Promise<void> {

    try {
      this.login = await this.auth.verificarLogin(this.formularioLogin.get('usuario')?.value, this.formularioLogin.get('contrasena')?.value);
      if(this.login){
        this.router.navigate(['landing']);
      } else {
        this.ngOnInit();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
