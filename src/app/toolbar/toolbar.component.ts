import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
nombreUsuario: any;
rol: string;

  ngOnInit(): void {
    this.nombreUsuario = sessionStorage.getItem('nombres');
    if(sessionStorage.getItem('rol') === "1") {
      this.rol = "Administrador de aplicación"
    }
  }


}
