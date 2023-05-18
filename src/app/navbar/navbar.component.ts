import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  admin: boolean = false;

  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem('usuarioactual');
    const usuario = usuarioString ? JSON.parse(usuarioString) : '';
    if(usuario.rol === 1){
      this.admin = true;
    }
    }

}
