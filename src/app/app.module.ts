import { NgModule } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { RutasModule } from './routes/rutas.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core/core.module';
import { LayoutModule } from './layout/layout.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    RutasModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    SharedModule,
    LoginModule,
    LayoutModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
