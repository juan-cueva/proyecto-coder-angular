import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { LayoutComponent } from './layout.component';
import { MainModule } from '../main/main.module';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    ToolbarModule,
    MainModule,
    NavbarModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
